import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { LinksEntity, LinkStatus } from 'src/entities/Links.entity';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  private readonly MAX_CONCURRENT_REQUESTS = 10;

  constructor(
    @InjectRepository(LinksEntity)
    private readonly linksRepository: Repository<LinksEntity>,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    this.logger.log('Starting link processing');
    const links = await this.getLinksInProcess();
    if (links.length === 0) {
      this.logger.debug('No new links to process.');
      return;
    }

    this.logger.log(`Processing ${links.length} links`);
    await Promise.allSettled(links.map((link) => this.processLink(link)));
  }

  private async getLinksInProcess(): Promise<LinksEntity[]> {
    try {
      // Added transaction to avoid race condition
      const queryRunner =
        this.linksRepository.manager.connection.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const result = await this.linksRepository.query(
          `UPDATE "links"
         SET "status" = $1
         WHERE "id" IN (
             SELECT "id" FROM "links"
             WHERE "status" = $2
             ORDER BY "id"
             LIMIT $3
             FOR UPDATE SKIP LOCKED
         )
         RETURNING *;`,
          [LinkStatus.PROCESSING, LinkStatus.NEW, this.MAX_CONCURRENT_REQUESTS],
        );

        await queryRunner.commitTransaction();
        return result[0];
      } catch (error) {
        await queryRunner.rollbackTransaction();
        this.logger.error('Error in getLinksInProcess:', error);
        return [];
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      this.logger.error('Database error in getLinksInProcess:', error);
      return [];
    }
  }

  private async processLink(link: LinksEntity) {
    try {
      this.logger.log(`Processing: ${link.url}`);
      const response = await axios.get(link.url, {
        timeout: 5000,
        validateStatus: null,
      });

      await this.linksRepository.update(link.id, {
        status: LinkStatus.DONE,
        httpCode: response.status.toString(),
      });

      this.logger.log(`Done: ${link.url}`);
    } catch (error) {
      this.logger.log(`Processed with error: ${link.url}`);

      await this.linksRepository.update(link.id, {
        status: LinkStatus.ERROR,
        httpCode: error.response?.status || 'ERROR',
      });
    }
  }
}

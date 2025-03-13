import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { LinksEntity, LinkStatus } from 'src/entities/Links.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLinkDto } from './dto/createLink.dto';
import { UpdateLinkDto } from './dto/updateLink.dto';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);
  constructor(
    @InjectRepository(LinksEntity)
    private readonly linksRepository: Repository<LinksEntity>,
  ) {}

  async createLink(createLinkDto: CreateLinkDto) {
    try {
      const exist = await this.linksRepository.findOne({
        where: {
          url: createLinkDto.url,
        },
      });

      if (exist) {
        throw new BadRequestException('Link already exists');
      }

      const link = this.linksRepository.create({
        url: createLinkDto.url,
        status: LinkStatus.NEW,
      });

      const savedLink = await this.linksRepository.save(link);

      return {
        url: savedLink.url,
        status: savedLink.status,
        httpCode: savedLink.httpCode,
      };
    } catch (error) {
      this.logger.error('Failed to create link:', error);
      throw error;
    }
  }

  async getLinks(status?: LinkStatus) {
    const query = this.linksRepository.createQueryBuilder('link');

    if (status) {
      query.where('link.status = :status', { status });
    }

    return query.getMany();
  }

  async updateLink(id: string, updateLinkDto: UpdateLinkDto) {
    const link = await this.linksRepository.exists({
      where: {
        id: Number(id),
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    await this.linksRepository.update(id, {
      status: updateLinkDto.status as LinkStatus,
    });

    return {
      message: 'Link updated successfully',
    };
  }
}

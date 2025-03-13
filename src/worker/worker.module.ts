import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkerService } from './worker.service';
import { LinksEntity } from 'src/entities/Links.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinksEntity]), ScheduleModule.forRoot()],
  providers: [WorkerService, Logger],
})
export class WorkerModule {}

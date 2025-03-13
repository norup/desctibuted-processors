import { Logger, Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksEntity } from 'src/entities/Links.entity';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LinksEntity])],
  controllers: [LinksController],
  providers: [LinksService, Logger],
  exports: [LinksService],
})
export class LinksModule {}

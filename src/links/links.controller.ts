import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto, CreateLinkResponseDto } from './dto/createLink.dto';
import { ApiTags } from '@nestjs/swagger';
import { LinkStatus } from 'src/entities/Links.entity';
import { UpdateLinkDto } from './dto/updateLink.dto';
@ApiTags('links')
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  createLink(
    @Body() createLinkDto: CreateLinkDto,
  ): Promise<CreateLinkResponseDto> {
    return this.linksService.createLink(createLinkDto);
  }

  @Get()
  getLinks(
    @Query('status') status?: LinkStatus,
  ): Promise<CreateLinkResponseDto[]> {
    return this.linksService.getLinks(status);
  }

  @Patch(':id')
  updateLink(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.updateLink(id, updateLinkDto);
  }
}

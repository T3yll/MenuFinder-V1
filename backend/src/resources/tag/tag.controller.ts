import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() tag: Tag): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() tag: Tag): Promise<Tag> {
    return this.tagService.update(+id, tag);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tagService.remove(+id);
  }
}
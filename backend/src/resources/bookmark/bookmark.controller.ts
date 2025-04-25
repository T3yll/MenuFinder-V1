import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Bookmark } from './entities/bookmark.entity';
import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class FavoriController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() bookmark: Bookmark): Promise<Bookmark> {
    return this.bookmarkService.create(bookmark);
  }

  @Get()
  findAll(): Promise<Bookmark[]> {
    return this.bookmarkService.findAll();
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string): Promise<Bookmark[]> {
    return this.bookmarkService.findByUser(+id);
  }

  @Delete(':restaurantId/:userId')
  remove(
    @Param('restaurantId') restaurantId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.bookmarkService.remove(+restaurantId, +userId);
  }
}
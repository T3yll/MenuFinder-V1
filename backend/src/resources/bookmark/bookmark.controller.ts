import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Bookmark } from './entities/bookmark.entity';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() bookmark: CreateBookmarkDto): Promise<Bookmark> {
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

  @Get('restaurant/:id')
  findByRestaurant(@Param('id') id: string): Promise<Bookmark[]> {
    return this.bookmarkService.findByRestaurant(+id);
  }

  @Get(':restaurantId/:userId')
  findByRestaurantAndUser(
    @Param('restaurantId') restaurantId: string,
    @Param('userId') userId: string,
  ): Promise<Bookmark[]> {
    return this.bookmarkService.findByRestaurantAndUser(+restaurantId, +userId);
  }

  @Delete(':restaurantId/:userId')
  remove(
    @Param('restaurantId') restaurantId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.bookmarkService.remove(+restaurantId, +userId);
  }
}
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RestaurantTag } from './entities/restauranttag.entity';
import { RestaurantTagService } from './restauranttag.service';

@Controller('restaurant-tag')
export class RestaurantTagController {
  constructor(private readonly restaurantTagService: RestaurantTagService) {}

  @Post()
  create(@Body() restaurantTag: RestaurantTag): Promise<RestaurantTag> {
    return this.restaurantTagService.create(restaurantTag);
  }

  @Get()
  findAll(): Promise<RestaurantTag[]> {
    return this.restaurantTagService.findAll();
  }

  @Get('restaurant/:id')
  findByRestaurant(@Param('id') id: string): Promise<RestaurantTag[]> {
    return this.restaurantTagService.findByRestaurant(+id);
  }

  @Get('tag/:id')
  findByTag(@Param('id') id: string): Promise<RestaurantTag[]> {
    return this.restaurantTagService.findByTag(+id);
  }

  @Delete(':restaurantId/:tagId')
  remove(
    @Param('restaurantId') restaurantId: string,
    @Param('tagId') tagId: string,
  ): Promise<void> {
    return this.restaurantTagService.remove(+restaurantId, +tagId);
  }
}
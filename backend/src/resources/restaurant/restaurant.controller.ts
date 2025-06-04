import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Restaurant } from './entities/restaurant.entity';
import { Public } from '@/common/decorators/security/public.decorator';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Public()
  @Post()
  create(@Body() restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantService.create(restaurant);
  }
  @Public()
  @Get()
  findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

   @Get('count')
    @ApiOperation({ summary: 'Get the total number of restaurants' })
    @ApiResponse({
      status: 200,
      description: 'The total number of restaurants',
      type: Number,
    })
    async count(): Promise<object> {
      return {code:200,count : await this.restaurantService.count()};
    }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantService.update(+id, restaurant);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.restaurantService.remove(+id);
  }
}
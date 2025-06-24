import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { MenuService } from '../menu/menu.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Restaurant } from './entities/restaurant.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Public } from '@/common/decorators/security/public.decorator';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateAdressDto } from '../adress/dto/update-adress.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly menuService: MenuService
  ) {}

  @Public()
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantDto);
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

  @Public()
  @Get(':id/menus')
  getRestaurantMenus(@Param('id') id: string): Promise<Menu[]> {
    return this.menuService.findByRestaurant(+id);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() restaurant: UpdateRestaurantDto): Promise<Restaurant> {
    return this.restaurantService.update(+id, restaurant);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.restaurantService.remove(+id);
  }
}
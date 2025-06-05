import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MealService } from '../meal/meal.service';
import { Menu } from './entities/menu.entity';
import { Meal } from '../meal/entities/meal.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Public } from '@/common/decorators/security/public.decorator';

@Controller('menus')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly mealService: MealService
  ) {}

  @Public()
  @Post()
  create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = new Menu();
    menu.restaurant_id = createMenuDto.restaurant_id;
    menu.name = createMenuDto.name;
    menu.description = createMenuDto.description;
    
    return this.menuService.create(menu);
  }

  @Public()
  @Get()
  findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Menu> {
    return this.menuService.findOne(+id);
  }

  @Public()
  @Get('restaurant/:id')
  findByRestaurant(@Param('id') id: string): Promise<Menu[]> {
    return this.menuService.findByRestaurant(+id);
  }

  @Public()
  @Get(':id/meals')
  getMenuMeals(@Param('id') id: string): Promise<Meal[]> {
    return this.mealService.findByMenu(+id);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: Partial<Menu>): Promise<Menu> {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.menuService.remove(+id);
  }
}
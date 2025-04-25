import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() menu: Menu): Promise<Menu> {
    return this.menuService.create(menu);
  }

  @Get()
  findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Menu> {
    return this.menuService.findOne(+id);
  }

  @Get('restaurant/:id')
  findByRestaurant(@Param('id') id: string): Promise<Menu[]> {
    return this.menuService.findByRestaurant(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() menu: Menu): Promise<Menu> {
    return this.menuService.update(+id, menu);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.menuService.remove(+id);
  }
}
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Meal } from './entities/meal.entity';
import { MealService } from './meal.service';

@Controller('meals')
export class MealController {
  constructor(private readonly mealsService: MealService) {}

  @Post()
  create(@Body() meal: Meal): Promise<Meal> {
    return this.mealsService.create(meal);
  }

  @Get()
  findAll(): Promise<Meal[]> {
    return this.mealsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Meal> {
    return this.mealsService.findOne(+id);
  }

  @Get('menu/:id')
  findByMenu(@Param('id') id: string): Promise<Meal[]> {
    return this.mealsService.findByMenu(+id);
  }

  @Get('categorie/:id')
  findByCategorie(@Param('id') id: string): Promise<Meal[]> {
    return this.mealsService.findByCategorie(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() meal: Meal): Promise<Meal> {
    return this.mealsService.update(+id, meal);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.mealsService.remove(+id);
  }
}
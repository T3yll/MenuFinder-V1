// categorie-plat.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MealCategory } from './entities/mealcategory.entity';
import { MealCategoryService } from './mealcategory.service';

@Controller('meal-category')
export class MealCategoryController {
  constructor(private readonly mealCategoryService: MealCategoryService) {}

  @Post()
  create(@Body() mealCategory: MealCategory): Promise<MealCategory> {
    return this.mealCategoryService.create(mealCategory);
  }

  @Get()
  findAll(): Promise<MealCategory[]> {
    return this.mealCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MealCategory> {
    return this.mealCategoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() mealCategory: MealCategory): Promise<MealCategory> {
    return this.mealCategoryService.update(+id, mealCategory);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.mealCategoryService.remove(+id);
  }
}
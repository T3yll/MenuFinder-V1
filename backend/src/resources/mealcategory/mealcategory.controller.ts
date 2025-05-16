import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MealCategoryService } from './mealcategory.service';
import { MealCategory } from './entities/mealcategory.entity';
import { Public } from '@/common/decorators/security/public.decorator';

@Controller('meal-categories')
export class MealCategoryController {
  constructor(private readonly mealCategoryService: MealCategoryService) {}

  @Public()
  @Post()
  create(@Body() mealCategory: MealCategory): Promise<MealCategory> {
    return this.mealCategoryService.create(mealCategory);
  }

  @Public()
  @Get()
  findAll(): Promise<MealCategory[]> {
    return this.mealCategoryService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<MealCategory> {
    return this.mealCategoryService.findOne(+id);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() mealCategory: MealCategory): Promise<MealCategory> {
    return this.mealCategoryService.update(+id, mealCategory);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.mealCategoryService.remove(+id);
  }
}
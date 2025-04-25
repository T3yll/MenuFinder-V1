import { Module } from '@nestjs/common';
import { MealCategoryService } from './mealcategory.service';
import { MealCategoryController } from './mealcategory.controller';

@Module({
  controllers: [MealCategoryController],
  providers: [MealCategoryService],
})
export class MealcategoryModule {}

import { Module } from '@nestjs/common';
import { MealcategoryService } from './mealcategory.service';
import { MealcategoryController } from './mealcategory.controller';

@Module({
  controllers: [MealcategoryController],
  providers: [MealcategoryService],
})
export class MealcategoryModule {}

import { Module } from '@nestjs/common';
import { MealCategoryService } from './mealcategory.service';
import { MealCategoryController } from './mealcategory.controller';
import { MealCategory } from './entities/mealcategory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MealCategory])],
  controllers: [MealCategoryController],
  providers: [MealCategoryService],
})
export class MealcategoryModule {}

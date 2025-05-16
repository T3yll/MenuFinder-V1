import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealCategoryController } from './mealcategory.controller';
import { MealCategoryService } from './mealcategory.service';
import { MealCategory } from './entities/mealcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MealCategory])],
  controllers: [MealCategoryController],
  providers: [MealCategoryService],
  exports: [MealCategoryService],
})
export class MealCategoryModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { Meal } from './entities/meal.entity';
import { MealCategoryModule } from '../mealcategory/mealcategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal]),
    MealCategoryModule // Importez MealCategoryModule si nécessaire
  ],
  controllers: [MealController],
  providers: [MealService],
  exports: [MealService],
})
export class MealModule {}
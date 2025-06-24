import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
  ) {}

  async create(meal: Meal): Promise<Meal> {
    return this.mealRepository.save(meal);
  }

  async findAll(): Promise<Meal[]> {
    return this.mealRepository.find({
      relations: ['menu', 'image', 'mealCategory']
    });
  }

  async findOne(id: number): Promise<Meal> {
    return this.mealRepository.findOne({
      where: { item_id: id },
      relations: ['menu', 'image', 'mealCategory']
    });
  }

  async findByMenu(menuId: number): Promise<Meal[]> {
    return this.mealRepository.find({
      where: { menu_id: menuId },
      relations: ['image', 'mealCategory']
    });
  }

  async findByCategorie(categoryId: number): Promise<Meal[]> {
    return this.mealRepository.find({
      where: { meal_category_id: categoryId },
      relations: ['menu', 'image']
    });
  }

  async update(id: number, meal: Partial<Meal>): Promise<Meal> {
    await this.mealRepository.update(id, meal);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.mealRepository.delete(id);
  }
}
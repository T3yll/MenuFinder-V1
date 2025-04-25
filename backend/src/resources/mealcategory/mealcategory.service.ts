import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealCategory } from './entities/mealcategory.entity';

@Injectable()
export class MealCategoryService {
  constructor(
    @InjectRepository(MealCategory)
    private mealCategoryRepository: Repository<MealCategory>,
  ) {}

  create(mealCategory: MealCategory): Promise<MealCategory> {
    return this.mealCategoryRepository.save(mealCategory);
  }

  findAll(): Promise<MealCategory[]> {
    return this.mealCategoryRepository.find();
  }

  findOne(id: number): Promise<MealCategory> {
    return this.mealCategoryRepository.findOne({ where: { meal_category_id: id } });
  }

  async update(id: number, mealCategory: MealCategory): Promise<MealCategory> {
    await this.mealCategoryRepository.update(id, mealCategory);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.mealCategoryRepository.delete(id);
  }
}
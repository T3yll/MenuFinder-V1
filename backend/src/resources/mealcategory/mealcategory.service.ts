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

  async create(mealCategory: MealCategory): Promise<MealCategory> {
    return this.mealCategoryRepository.save(mealCategory);
  }

  async findAll(): Promise<MealCategory[]> {
    return this.mealCategoryRepository.find();
  }

  async findOne(id: number): Promise<MealCategory> {
    return this.mealCategoryRepository.findOne({
      where: { meal_category_id: id },
      relations: ['meals']
    });
  }

  async update(id: number, mealCategory: Partial<MealCategory>): Promise<MealCategory> {
    await this.mealCategoryRepository.update(id, mealCategory);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.mealCategoryRepository.delete(id);
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './entities/meal.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private platRepository: Repository<Meal>,
  ) {}

  create(plat: Meal): Promise<Meal> {
    return this.platRepository.save(plat);
  }

  findAll(): Promise<Meal[]> {
    return this.platRepository.find();
  }

  findOne(id: number): Promise<Meal> {
    return this.platRepository.findOne({ where: { meal_id: id } });
  }

  findByMenu(menuId: number): Promise<Meal[]> {
    return this.platRepository.find({ where: { menu_id: menuId } });
  }

  findByCategorie(categorieId: number): Promise<Meal[]> {
    return this.platRepository.find({ where: { meal_category_id: categorieId } });
  }

  async update(id: number, meal: Meal): Promise<Meal> {
    await this.platRepository.update(id, meal);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.platRepository.delete(id);
  }
}
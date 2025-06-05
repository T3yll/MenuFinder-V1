import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(menu: Menu): Promise<Menu> {
    return this.menuRepository.save(menu);
  }

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find({ 
      relations: ['restaurant', 'meals'] 
    });
  }

  async findOne(id: number): Promise<Menu> {
    return this.menuRepository.findOne({ 
      where: { menu_id: id },
      relations: ['restaurant', 'meals'] 
    });
  }

  async findByRestaurant(restaurantId: number): Promise<Menu[]> {
    return this.menuRepository.find({
      where: { restaurant_id: restaurantId },
      relations: ['meals']
    });
  }

  async update(id: number, menu: Partial<Menu>): Promise<Menu> {
    await this.menuRepository.update(id, menu);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
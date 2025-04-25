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

  create(menu: Menu): Promise<Menu> {
    return this.menuRepository.save(menu);
  }

  findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  findOne(id: number): Promise<Menu> {
    return this.menuRepository.findOne({ where: { menu_id: id } });
  }

  findByRestaurant(restaurantId: number): Promise<Menu[]> {
    return this.menuRepository.find({ where: { restaurant_id: restaurantId } });
  }

  async update(id: number, menu: Menu): Promise<Menu> {
    await this.menuRepository.update(id, menu);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
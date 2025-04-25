// restaurant.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  create(restaurant: Restaurant): Promise<Restaurant> {
    return this.restaurantRepository.save(restaurant);
  }

  findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  findOne(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne({ where: { restaurant_id: id } });
  }

  async update(id: number, restaurant: Restaurant): Promise<Restaurant> {
    await this.restaurantRepository.update(id, restaurant);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.restaurantRepository.delete(id);
  }
}
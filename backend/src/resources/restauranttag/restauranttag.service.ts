import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantTag } from './entities/restauranttag.entity';

@Injectable()
export class RestaurantTagService {
  constructor(
    @InjectRepository(RestaurantTag)
    private restaurantTagRepository: Repository<RestaurantTag>,
  ) {}

  create(tagRestaurant: RestaurantTag): Promise<RestaurantTag> {
    return this.restaurantTagRepository.save(tagRestaurant);
  }

  findAll(): Promise<RestaurantTag[]> {
    return this.restaurantTagRepository.find();
  }

  findByRestaurant(restaurantId: number): Promise<RestaurantTag[]> {
    return this.restaurantTagRepository.find({ where: { id_restaurant: restaurantId } });
  }

  findByTag(tagId: number): Promise<RestaurantTag[]> {
    return this.restaurantTagRepository.find({ where: { id_tag: tagId } });
  }

  async remove(restaurantId: number, tagId: number): Promise<void> {
    await this.restaurantTagRepository.delete({ id_restaurant: restaurantId, id_tag: tagId });
  }
}
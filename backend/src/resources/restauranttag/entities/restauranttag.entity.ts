import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import { Tag } from '@/resources/tag/entities/tag.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('RestaurantTag')
export class RestaurantTag {
  @Column({ primary: true })
  id_restaurant: number;

  @Column({ primary: true })
  id_tag: number;

  @ManyToOne(() => Restaurant, restaurant => restaurant.tagRestaurants)
  @JoinColumn({ name: 'id_restaurant' })
  restaurant: Restaurant;

  @ManyToOne(() => Tag, tag => tag.tagRestaurants)
  @JoinColumn({ name: 'id_tag' })
  tag: Tag;
}
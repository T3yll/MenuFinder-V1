import { RestaurantTag } from '@/resources/restauranttag/entities/restauranttag.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('Tag')
export class Tag {
  @PrimaryGeneratedColumn({ unsigned: true })
  tag_id: number;

  @Column('text')
  name: string;

  @OneToMany(() => RestaurantTag, restaurantTag => restaurantTag.tag)
  tagRestaurants: RestaurantTag[];
}
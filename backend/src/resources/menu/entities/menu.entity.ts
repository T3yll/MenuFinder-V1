import { Meal } from '@/resources/meal/entities/meal.entity';
import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('Menu')
export class Menu {
  @PrimaryGeneratedColumn({ unsigned: true })
  menu_id: number;

  @Column()
  restaurant_id: number;

  @ManyToOne(() => Restaurant, restaurant => restaurant.menus)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @OneToMany(() => Meal, meal => meal.menu)
  meals: Meal[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Meal } from '../../meal/entities/meal.entity';
import { Optional } from '@nestjs/common';

@Entity('Menu')
export class Menu {
  @PrimaryGeneratedColumn({ unsigned: true })
  menu_id: number;

  @Column()
  restaurant_id: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.menus)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @OneToMany(() => Meal, meal => meal.menu)
  meals: Meal[];
}
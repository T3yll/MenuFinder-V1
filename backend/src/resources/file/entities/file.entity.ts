import { Meal } from '@/resources/meal/entities/meal.entity';
import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import { User } from '@/resources/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('file')
export class File {
  @PrimaryGeneratedColumn({ unsigned: true })
  file_id: string;

  @Column('text')
  path: string;

  @Column('text')
  name: string;

  @Column('text')
  type: string;

  @OneToMany(() => User, user => user.image)
  users: User[];

  @OneToMany(() => Restaurant, restaurant => restaurant.image)
  restaurants: Restaurant[];

  @OneToMany(() => Meal, meal => meal.image)
  meals: Meal[];
}
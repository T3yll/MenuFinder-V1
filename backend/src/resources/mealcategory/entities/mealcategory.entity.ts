import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Meal } from '../../meal/entities/meal.entity';

@Entity('MealCategory')
export class MealCategory {
  @PrimaryGeneratedColumn({ unsigned: true })
  meal_category_id: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Meal, meal => meal.mealCategory)
  meals: Meal[];
}
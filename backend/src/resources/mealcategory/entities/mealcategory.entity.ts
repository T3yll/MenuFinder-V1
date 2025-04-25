import { Meal } from '@/resources/meal/entities/meal.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('meal_category')
export class MealCategory {
  @PrimaryGeneratedColumn({ unsigned: true })
  meal_category_id: number;

  @Column()
  name: number; // Notez que dans le SQL, c'est un BIGINT, mais c'est probablement une erreur et devrait être un TEXT

  @OneToMany(() => Meal, meal => meal.mealCategory)
  meals: Meal[];
}
import { MealCategory } from '@/resources/mealcategory/entities/mealcategory.entity';
import { Menu } from '@/resources/menu/entities/menu.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('meal')
export class Meal {
  @PrimaryGeneratedColumn({ unsigned: true })
  meal_id: number;

  @Column()
  menu_id: number;

  @Column('text')
  name: string;

  @Column()
  price: number;

  @Column()
  meal_category_id: number;

  @Column('text')
  ingredients: string;

  @Column()
  image_file_id: number;

  @ManyToOne(() => Menu, menu => menu.meals)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToOne(() => MealCategory, mealCategory => mealCategory.meals)
  @JoinColumn({ name: 'meal_category_id' })
  mealCategory: MealCategory;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'image_file_id' })
  image: File;
}
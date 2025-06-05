import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';
import { File } from '../../file/entities/file.entity';
import { MealCategory } from '../../mealcategory/entities/mealcategory.entity';

@Entity('Meal')
export class Meal {
  @PrimaryGeneratedColumn({ unsigned: true })
  item_id: number;

  @Column()
  menu_id: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  // Si cela ne fonctionne pas, essayer simplement numeric sans précision/échelle
  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  meal_category_id: number;

  @Column({ nullable: true })
  image_file_id: number;

  @ManyToOne(() => Menu, menu => menu.meals)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'image_file_id' })
  image: File;

  @ManyToOne(() => MealCategory, mealCategory => mealCategory.meals)
  @JoinColumn({ name: 'meal_category_id' })
  mealCategory: MealCategory;
}
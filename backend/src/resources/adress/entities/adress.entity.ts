import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('Adress')
export class Adress {
  @PrimaryGeneratedColumn({ unsigned: true })
  adress_id: number;

  @Column()
  number: number;

  @Column('text')
  street: string;

  @Column('text')
  city: string;

  @Column()
  postal_code: number;

  @Column('text')
  country: string;

  @OneToMany(() => Restaurant, restaurant => restaurant.adress)
  restaurants: Restaurant[];
}
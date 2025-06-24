import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import { Optional, Options } from '@nestjs/common';
import { IsNumber } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, IsNull } from 'typeorm';

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

  @Optional()
  @IsNumber()
  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  longitude: number;

  @Optional()
  @IsNumber()
  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitude: number;
}
import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import { User } from '@/resources/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('Review')
export class Review {
  @PrimaryGeneratedColumn({ unsigned: true })
  review_id: number;

  @Column()
  restaurant_id: number;

  @Column()
  user_id: number;

  @Column('text')
  text: string;

  @Column('date')
  added_at: Date;

  @Column('date')
  updated_at: Date;

  @ManyToOne(() => Restaurant, restaurant => restaurant.rewiews)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @ManyToOne(() => User, user => user.review)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Response, response => response)
  responses: Response[];
}
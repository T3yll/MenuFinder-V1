import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import { User } from '@/resources/user/entities/user.entity';
import { Entity, PrimaryColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity('Bookmark')
export class Bookmark {
  @PrimaryColumn()
  restaurant_id: number;

  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => Restaurant, restaurant => restaurant.bookmarks)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @OneToOne(() => User, user => user.bookmarks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
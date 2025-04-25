import { Adress } from '@/resources/adress/entities/adress.entity';
import { User } from '@/resources/user/entities/user.entity';
import { Review } from '@/resources/review/entities/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Menu } from '@/resources/menu/entities/menu.entity';
import { RestaurantTag } from '@/resources/restauranttag/entities/restauranttag.entity';
import { Bookmark } from '@/resources/bookmark/entities/bookmark.entity';
import { File } from '@/resources/file/entities/file.entity';

@Entity('Restaurant')
export class Restaurant {
  @PrimaryGeneratedColumn({ unsigned: true })
  restaurant_id: number;

  @Column()
  adresse_id: number;

  @Column()
  owner_id: number;

  @Column('text')
  name: string;

  @Column('text')
  type: string;

  @Column()
  image_file_id: number;

  @ManyToOne(() => Adress)
  @JoinColumn({ name: 'adress_id' })
  adress: Adress;

  @ManyToOne(() => User, user => user.restaurants)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'image_file_id' })
  image: File;

  @OneToMany(() => Review, rewiew => rewiew.restaurant)
  rewiews: Review[];

  @OneToMany(() => Menu, menu => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => RestaurantTag, restaurantTag => RestaurantTag)
  tagRestaurants: RestaurantTag[];

  @OneToMany(() => Bookmark, bookmark => bookmark.restaurant)
  bookmarks: Bookmark[];
}
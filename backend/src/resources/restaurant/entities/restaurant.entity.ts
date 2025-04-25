import { User } from '@/resources/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

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

  @OneToMany(() => Rewiew, rewiew => rewiew.restaurant)
  rewiews: Rewiew[];

  @OneToMany(() => Menu, menu => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => RestaurantTag, restaurantTag => RestaurantTag.restaurant)
  tagRestaurants: RestaurantTag[];

  @OneToMany(() => BookMark, bookmark => bookmark.restaurant)
  bookmarks: BookMark[];
}
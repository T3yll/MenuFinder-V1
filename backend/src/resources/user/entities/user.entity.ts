import { Bookmark } from '@/resources/bookmark/entities/bookmark.entity';
import { File } from '@/resources/file/entities/file.entity';
import { Response } from '@/resources/response/entities/response.entity';
import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import { Review } from '@/resources/review/entities/review.entity';
import { Exclude } from 'class-transformer';
import { Report } from '@/resources/report/entities/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany, Unique
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Exclude()
  @Column({ length: 255 })
  password: string;

  @Column('text')
  nom: string;

  @Column('text')
  prenom: string;

  @Column('text')
  @Unique(['email'])
  email: string;

  @Column('boolean')
  bAdmin: boolean;

  @Column({ nullable: true })
  image_file_id: string;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'image_file_id' })
  image: File;

  @OneToMany(() => Restaurant, restaurant => restaurant.owner)
  restaurants: Restaurant[];

  @OneToMany(() => Review, review => review.user)
  review: Review[];

  @OneToMany(() => Response, response => response.user)
  responses: Response[];

  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Report, report => report.userId)
  reports: Report[];

  getUsername(): string {
    return this.username;
  }

  setUsername(value: string): void {
    this.username = value;
  }

  toJSON() {
    const { password, ...userData } = this;
    return {
      ...userData, // Inclure tous les champs de User sauf le password
    };
  }
}

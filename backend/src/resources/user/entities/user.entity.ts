import { Avis } from '@/resources/avis/entities/avis.entity';
import { Favori } from '@/resources/favori/entities/favori.entity';
import { Response } from '@/resources/response/entities/response.entity';
import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column('text')
  nom: string;

  @Column('text')
  prenom: string;

  @Column('text')
  email: string;

  @Column('boolean')
  bAdmin: boolean;

  @Column()
  image_file_id: number;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'image_file_id' })
  image: File;

  @OneToMany(() => Restaurant, restaurant => restaurant.proprietaire)
  restaurants: Restaurant[];

  @OneToMany(() => Avis, avis => avis.user)
  avis: Avis[];

  @OneToMany(() => Response, response => response.user)
  responses: Response[];

  @OneToOne(() => Favori, favori => favori.user)
  favoris: Favori[];

  getUsername(): string {
    return this.username;
  }

  setUsername(value: string): void {
    this.username = value;
  }

  toJSON() {
    const { ...userData } = this;
    return {
      ...userData, // Inclure tous les champs de User
    };
  }
}

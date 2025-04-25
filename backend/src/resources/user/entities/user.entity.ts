import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  password: string;

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

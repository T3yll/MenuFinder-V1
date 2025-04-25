import { Review } from '@/resources/review/entities/review.entity';
import { User } from '@/resources/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Response')
export class Response {
  @PrimaryGeneratedColumn({ unsigned: true })
  response_id: number;

  @Column()
  review_id: number;

  @Column()
  user_id: number;

  @Column('text')
  text: string;

  @Column('date')
  added_at: Date;

  @Column('date')
  updated_at: Date;

  @ManyToOne(() => Review, review => review.responses)
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => User, user => user.responses)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
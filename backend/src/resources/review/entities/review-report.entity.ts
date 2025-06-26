import { Review } from '@/resources/review/entities/review.entity';
import { User } from '@/resources/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('ReviewReport')
export class ReviewReport {
  @PrimaryGeneratedColumn({ unsigned: true })
  report_id: number;

  @Column()
  review_id: number;

  @Column()
  reporter_user_id: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';

  @CreateDateColumn()
  reported_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Review, review => review.reports)
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @ManyToOne(() => User, user => user.reportedReviews)
  @JoinColumn({ name: 'reporter_user_id' })
  reporter: User;
} 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from '@/resources/user/entities/user.entity';
import { Restaurant } from '@/resources/restaurant/entities/restaurant.entity';

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    restaurantId: number;

    @Column()
    motif: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
    @Column({ type: 'boolean', default: false })
    isResolved: boolean;

    @ManyToOne(() => User, user => user.reports)
    user: User;
    @ManyToOne(() => Restaurant, restaurant => restaurant.reports)
    restaurant: Restaurant;

}
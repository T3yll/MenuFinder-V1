import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@TimestampFields()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  label: string;

  @Column({ default: false })
  isEnabled: boolean;
}

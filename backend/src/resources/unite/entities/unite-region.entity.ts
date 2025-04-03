import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@TimestampFields()
export class UniteRegion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  label: string;
}

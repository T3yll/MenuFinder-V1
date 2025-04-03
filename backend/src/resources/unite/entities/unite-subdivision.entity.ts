import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@TimestampFields()
export class UniteSubdivision {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  label: string;

  @Column({ length: 10 })
  abrege: string;
}

import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

@Entity()
@TimestampFields()
export class UniteInstitution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  label: string;

  @Column({ length: 10 })
  abrege: string;
}

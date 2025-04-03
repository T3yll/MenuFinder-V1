import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@TimestampFields()
export class UniteType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  label: string;

  @Column({ length: 100, nullable: true })
  abrege: string;

  @Column({ length: 100, nullable: true })
  abreviation: string;
}

import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@TimestampFields()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: true })
  label: string;

  @Column({ length: 255, nullable: true })
  abrege: string;

  @Column({ type: 'int', nullable: true })
  corps: number;

  @Column({ type: 'int', nullable: true })
  poids: number;
}

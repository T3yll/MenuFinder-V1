import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UniteRegion } from './unite-region.entity';
import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';

@Entity()
@TimestampFields()
export class UniteDepartement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3, unique: true })
  numeroDept: string;

  @Column({ length: 255 })
  label: string;

  @ManyToOne(() => UniteRegion)
  @JoinColumn()
  uniteRegion: UniteRegion;
}

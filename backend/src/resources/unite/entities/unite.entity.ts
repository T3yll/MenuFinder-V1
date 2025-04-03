import { ContactFields } from '@/common/decorators/fields/contact-fields.decorator';
import { LocalizationFields } from '@/common/decorators/fields/localization-fields.decorator';
import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UniteDepartement } from './unite-departement.entity';
import { UniteType } from './unite-type.entity';
import { UniteInstitution } from './unite-institution.entity';
import { UniteSubdivision } from './unite-subdivision.entity';

@Entity()
@TimestampFields()
@LocalizationFields()
@ContactFields()
export class Unite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  codeUnite: string;

  @Column({ length: 255, nullable: true })
  label: string;

  @Column({ length: 255, nullable: true })
  fullLabel: string;

  @ManyToOne(() => UniteDepartement)
  @JoinColumn()
  uniteDepartement: UniteDepartement;

  @ManyToOne(() => UniteType, { nullable: true })
  @JoinColumn()
  uniteType: UniteType;

  @ManyToOne(() => UniteInstitution)
  @JoinColumn()
  uniteInstitution: UniteInstitution;

  @ManyToOne(() => UniteSubdivision)
  @JoinColumn()
  uniteSubdivision: UniteSubdivision;

  @ManyToOne(() => Unite, { nullable: true })
  @JoinColumn()
  hierarchie: Unite;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Unite } from '@/resources/unite/entities/unite.entity';
import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import { ContactFields } from '@/common/decorators/fields/contact-fields.decorator';
import { Grade } from './grade.entity';

@Entity()
@TimestampFields()
@ContactFields()
export class UserDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userRIO: string;

  @Column({ type: 'int', nullable: true })
  matriculeCheops: number;

  @Column({ type: 'int', nullable: true })
  matriculeDialogue: number;

  @ManyToOne(() => Unite, { nullable: true })
  @JoinColumn()
  serviceAffectation: Unite;

  @ManyToOne(() => Unite, { nullable: true })
  @JoinColumn()
  serviceOperationnel: Unite;

  @Column({ type: 'int', nullable: true })
  anonymatServiceOperationnel: number;

  @Column({ type: 'int', nullable: true })
  anonymatServiceAffectation: number;

  @ManyToOne(() => Grade, (grade) => grade.id, { nullable: true })
  @JoinColumn()
  grade: Grade;

  //Id de corps personnel
  @Column({ type: 'int', nullable: true })
  corpsId: number;

  //Id de statut de corps personnel
  @Column({ nullable: true, length: 1 })
  statusCorpsId: string;

  //Id de responsabilité du personnel
  @Column({ nullable: true, length: 1 })
  responsabilityId: string;

  @Column({ length: 255, nullable: true })
  civilite: string;

  @Column({ length: 255, nullable: true })
  nomNaissance: string;

  @Column({ length: 255, nullable: true })
  nomUsage: string;

  @Column({ length: 255, nullable: true })
  prenom: string;

  @Column({ type: 'date', nullable: true })
  dateNaissance: Date;

  //Niveau d'anonymat (1 = non anonyme, 2 = anonymat moyen, 3 = anonymat fort).
  @Column({ type: 'int', nullable: true })
  anonymityLevel: number;

  //Reserviste
  @Column({ type: 'int', nullable: true })
  reservist: number;

  @OneToOne(() => User, (user) => user.userDetail, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}

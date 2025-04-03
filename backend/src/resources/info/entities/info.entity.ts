import { ContactFields } from '@/common/decorators/fields/contact-fields.decorator';
import { FileFields } from '@/common/decorators/fields/file-fields.decorator';
import { LocalizationFields } from '@/common/decorators/fields/localization-fields.decorator';
import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '@/resources/team/entities/team.entity';
import { User } from '@/resources/user/entities/user.entity';
import { Optional } from '@nestjs/common';

@Entity()
@ContactFields()
@FileFields()
@LocalizationFields()
@TimestampFields()
export class Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  label: string;

  @Column({ length: 255 })
  description: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ default: false })
  isPinned: boolean;

  @ManyToMany(() => Team, (team) => team.infos)
  @JoinTable({ name: 'info_teams' })
  @Optional()
  teams: Team[];

  @ManyToOne(() => User, (user) => user.infos)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.updatedInfos)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;
}

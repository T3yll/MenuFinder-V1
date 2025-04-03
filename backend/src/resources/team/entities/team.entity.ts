import { LocalizationFields } from '@/common/decorators/fields/localization-fields.decorator';
import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '@/resources/user/entities/user.entity';
import { Info } from '@/resources/info/entities/info.entity';
import { ContactFields } from '@/common/decorators/fields/contact-fields.decorator';

@Entity()
@TimestampFields()
@LocalizationFields()
@ContactFields()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  label: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  letterHead: string;

  @ManyToMany(() => User, (user) => user.teams)
  users: User[];

  @ManyToMany(() => Info, (info) => info.teams)
  infos: Info[];
}

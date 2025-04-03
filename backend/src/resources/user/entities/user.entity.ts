import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserDetail } from '@/resources/user/entities/user-detail.entity';
import { TimestampFields } from '@/common/decorators/fields/timestamp-fields.decorator';
import { Team } from '@/resources/team/entities/team.entity';
import { Info } from '@/resources/info/entities/info.entity';

@Entity()
@TimestampFields()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @ManyToMany(() => Team, (team) => team.users)
  @JoinTable({ name: 'user_teams' })
  teams: Team[];

  @ManyToOne(() => Team, { nullable: true, eager: true }) // Relation vers l'équipe active
  currentTeam: Team | null;

  @OneToMany(() => Info, (info) => info.createdBy)
  infos: Info[];

  @OneToOne(() => UserDetail, (userDetail) => userDetail.user, {
    cascade: true,
    eager: true,
  })
  userDetail: UserDetail;

  // Map des champs dynamiques (kerrouche, etc.)
  [key: string]: any;

  private _ensureUserDetail() {
    if (!this.userDetail) {
      this.userDetail = new UserDetail();
    }
  }

  // Getter dynamique
  get(key: string): any {
    if (this.userDetail && key in this.userDetail) {
      return this.userDetail[key] || null;
    }
    return this[key];
  }

  // Setter dynamique
  set(key: string, value: any): void {
    if (key in (this.userDetail || {})) {
      this._ensureUserDetail();
      this.userDetail[key] = value;
    } else {
      this[key] = value;
    }
  }

  toJSON() {
    const { userDetail, ...userData } = this;
    const { id, ...userDetailData } = userDetail || {};
    return {
      ...userData, // Inclure tous les champs de User
      ...(userDetail ? { ...userDetailData } : {}), // Propager les champs de UserDetail sans le champ id
    };
  }
}

import { IUser } from '@/modules/User/models/IUser';
export interface ITeam {
  id: number;
  label: string;
  description?: string | null;
  letterHead?: string | null;
  users: IUser[];
  contactEmail: string;
  contactPhone: string;
  createdAt: Date;
}

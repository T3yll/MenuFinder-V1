import { IUser as User } from '@/modules/User/models/IUser';
import { ITeam as Team } from '@/modules/Team/models/ITeam';

export interface IInfo {
  id: number;
  label: string;
  description: string;
  content: string;
  expirationDate: Date;
  userId: number;
  user: User;
  teams: Team[];
  isHidden: boolean;
  isPinned: boolean;
  contactEmail: string;
  contactPhone: string;
  lattitude: number;
  longitude: number;
  altitude: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

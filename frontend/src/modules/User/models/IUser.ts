import { ITeam } from '@/modules/Team/models/ITeam';

export interface IUser {
  id: number;
  username: string;
  password: string;
  teams: ITeam[];
  currentTeam: ITeam | null;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  userRIO: string;
  matriculeCheops: number;
  matriculeDialogue: number;
  anonymatServiceOperationnel: number;
  anonymatServiceAffectation: number;
  corpsId: number;
  statusCorpsId: number;
  responsabilityId: number;
  civilite: string;
  nomNaissance: string;
  nomUsage: string;
  prenom: string;
  dateNaissance: Date;
  anonymityLevel: number;
  reservist: number;
  contactEmail: string;
  contactPhone: string;
}

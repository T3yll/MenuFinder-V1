import { IMenuItem } from '@/common/components/layout/MenuSidebar';

export const MENU_DATA: IMenuItem[] = [
  {
    name: 'Fiches infos',
    icon: 'fa fa-file nav-icon',
    path: '/infos',
  },
  // Pour l'instant on va passer par le MenuProfil pour afficher le show du user 
  // {
  //   name: 'Mon profil',
  //   icon: 'fa fa-address-card nav-icon',
  //   path: '/users/me',
  // },
  {
    name: 'Administration',
    isLabel: true,
  },
  {
    name: 'Utilisateurs',
    icon: 'fa fa-user-gear nav-icon',
    path: '/users',
  },
  {
    name: 'Gestion des équipes',
    icon: 'fa fa-users nav-icon',
    path: '/teams',
  },
  {
    name: 'Gestion des fonctionnalités',
    icon: 'fa fa-flag nav-icon',
    path: '/features',
  },
];

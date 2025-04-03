import React, { useEffect, useState } from 'react';
import UserService from '@/modules/User/services/UserService';
import { IUser } from '@/modules/User/models/IUser';
import Datatable from '@/common/components/advanced/Datatable/Datatable';
import { Column } from 'primereact/column';

const UserIndexDatatable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const page = 1;
  const rows = 9;
  const searchQuery = '';

  const fetchData = async (page: number, offset: number, search?: string) => {
    try {
      const dataInfos = await UserService.getUsers(page, offset, search);
      setUsers(dataInfos.data);
      setTotalRecords(dataInfos.totalRecords);
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
    }
  };

  // Permet de gérer les actions personnalisées dans le header du Datatable
  const headerCustomActions = () => <></>;

  // Permet de gérer les actions personnalisées dans la colonne action du Datatable
  const rowCustomActions = (rowData: IUser) => <></>;

  return (
    <Datatable
      values={users}
      headerGenericActions={[]}
      headerCustomActions={headerCustomActions}
      rowGenericActions={['show']}
      rowCustomActions={rowCustomActions}
      totalRecords={totalRecords}
      fetchData={fetchData}
    >
      <Column field="username" header="Utilisateur" />
      <Column
        field="nomUsage"
        header="Nom"
        body={(rowData: IUser) =>
          rowData.nomUsage ? rowData.nomUsage : 'Non renseigné'
        }
      />
      <Column
        field="contactPhone"
        header="Téléphone"
        body={(rowData: IUser) =>
          rowData.contactPhone && rowData.contactPhone.length > 0
            ? rowData.contactPhone
            : 'Non renseigné'
        }
      />
      <Column
        field="teams"
        header="Équipe de travail"
        body={(rowData: IUser) =>
          rowData.teams.length > 3
            ? rowData.teams
                .slice(0, 3)
                .map((team, index) => {
                  const badgeClass =
                    index % 2 === 0
                      ? 'badge badge-accent'
                      : 'badge badge-primary';
                  return (
                    <div className={`mr-1 ${badgeClass}`}>{team.label}</div>
                  );
                })
                .concat(<div className="mr-1 badge badge-primary">...</div>)
            : rowData.teams.map((team, index) => {
                const badgeClass =
                  index % 2 === 0
                    ? 'badge badge-accent'
                    : 'badge badge-primary';
                return <div className={`mr-1 ${badgeClass}`}>{team.label}</div>;
              })
        }
      />
    </Datatable>
  );
};

export default UserIndexDatatable;

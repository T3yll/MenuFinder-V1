import Datatable from '@/common/components/advanced/Datatable/Datatable';
import { useEffect, useState } from 'react';
import { ITeam } from '@/modules/Team/models/ITeam';
import { Column } from 'primereact/column';
import TeamService from '@/modules/Team/services/TeamService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TeamIndexDatatable = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const page = 1;
  const rows = 9;
  const searchQuery = '';
  const navigate = useNavigate();

  const fetchData = async (page: number, offset: number, search?: string) => {
    try {
      const query = { page, offset, search };
      const dataTeams = await TeamService.getTeams(query);
      setTeams(dataTeams.data);
      setTotalRecords(dataTeams.totalRecords);
    } catch (err) {
      console.error('Erreur lors de la récupération des teams :', err);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await TeamService.deleteTeam(id);
      toast.success('Information supprimée avec succès');
      fetchData(page, rows, searchQuery);
      navigate('/teams');
    } catch (err) {
      toast.error('Une erreur est survenue lors de la suppression');
    }
  };

  // Permet de gérer les actions personnalisées dans le header du Datatable
  const headerCustomActions = () => <></>;

  // Permet de gérer les actions personnalisées dans la colonne action du Datatable
  const rowCustomActions = (rowData: ITeam) => <></>;

  return (
    <Datatable
      values={teams}
      headerGenericActions={[]}
      headerCustomActions={headerCustomActions}
      rowGenericActions={['show', 'edit', 'delete']}
      rowCustomActions={rowCustomActions}
      totalRecords={totalRecords}
      onDeleteProp={onDelete}
      fetchData={fetchData}
    >
      <Column field="label" header="Label" />
      <Column field="contactEmail" header="Mail de contact" />
      <Column field="contactPhone" header="Numéro de contact" />
      <Column
        field="description"
        header="Description"
        body={(rowData: ITeam) =>
          rowData.description
            ? rowData.description.length > 20
              ? rowData.description.substring(0, 20) + '...'
              : rowData.description
            : 'N/A'
        }
      />
      {/* <Column
        field="createdAt"
        header="Date de création"
        body={(rowData: ITeam) => rowData.createdAt.toLocaleDateString('fr-FR')}
      /> */}
    </Datatable>
  );
};

export default TeamIndexDatatable;

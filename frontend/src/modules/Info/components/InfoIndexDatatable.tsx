import Datatable from '@/common/components/advanced/Datatable/Datatable';
import { useEffect, useState } from 'react';
import { IInfo } from '@/modules/Info/models/IInfo';
import { Column } from 'primereact/column';
import InfoService from '../services/InfoService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const InfoIndexDatatable = () => {
  const [infos, setInfos] = useState<IInfo[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const page = 1;
  const rows = 9;
  const searchQuery = '';
  const navigate = useNavigate();

  const fetchData = async (page: number, offset: number, search?: string) => {
    try {
      const query = { page, offset, search };
      const dataInfos = await InfoService.getInfos(query);
      setInfos(dataInfos.data);
      setTotalRecords(dataInfos.totalRecords);
    } catch (err) {
      console.error('Erreur lors de la récupération des infos:', err);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await InfoService.deleteInfo(id);
      toast.success('Information supprimée avec succès');
      fetchData(page, rows, searchQuery);
      navigate('/infos?tab=datatable');
    } catch (err) {
      toast.error('Une erreur est survenue lors de la suppression');
    }
  };

  // Permet de gérer les actions personnalisées dans le header du Datatable
  const headerCustomActions = () => <></>;

  // Permet de gérer les actions personnalisées dans la colonne action du Datatable
  const rowCustomActions = (rowData: IInfo) => <></>;

  const displayTeams = (info: IInfo) => {
    return (
      <>
        {info.teams.length === 0 && (
          <span
            className="badge badge-lg"
            title="Les fiches sans équipe sont visibles par tous"
          >
            Publique
          </span>
        )}

        {info.teams.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {info.teams.slice(0, 1).map((team, id) => (
              <span
                key={id}
                className={`badge badge-soft badge-${id % 2 === 0 ? 'accent' : 'primary'} badge-lg`}
              >
                {team.label}
              </span>
            ))}
            {info.teams.length > 2 && (
              <span
                className="badge badge-soft badge-primary badge-lg"
                title="Cliquer pour voir les autres équipes"
              >
                {`+ ${info.teams.length - 1}`}
              </span>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <Datatable
      values={infos}
      headerGenericActions={[]}
      headerCustomActions={headerCustomActions}
      onDeleteProp={onDelete}
      rowGenericActions={['show', 'edit', 'delete']}
      rowCustomActions={rowCustomActions}
      totalRecords={totalRecords}
      fetchData={fetchData}
    >
      <Column field="label" header="Label" />
      <Column field="contactEmail" header="Mail de contact" />
      <Column field="contactPhone" header="Numéro de contact" />
      <Column
        field="description"
        header="Description"
        body={(rowData: IInfo) =>
          rowData.description.length > 20
            ? rowData.description.substring(0, 20) + '...'
            : rowData.description
        }
      />
      <Column
        field="Teams"
        header="Équipes"
        body={(rowData: IInfo) => displayTeams(rowData)}
      />
    </Datatable>
  );
};

export default InfoIndexDatatable;

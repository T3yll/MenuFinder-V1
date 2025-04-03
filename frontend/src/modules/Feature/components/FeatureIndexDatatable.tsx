import Datatable from '@/common/components/advanced/Datatable/Datatable';
import { useEffect, useState } from 'react';
import { IFeature } from '@/modules/Feature/models/IFeature';
import { Column } from 'primereact/column';
import FeatureService from '@/modules/Feature/services/FeatureService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FeatureIndexDatatable = () => {
  const [features, setFeatures] = useState<IFeature[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const page = 1;
  const rows = 9;
  const searchQuery = '';
  const navigate = useNavigate();

  const fetchData = async (page: number, offset: number, search?: string) => {
    try {
      const dataFeatures = await FeatureService.getFeatures(
        page,
        offset,
        search
      );
      setFeatures(dataFeatures.data);
      setTotalRecords(dataFeatures.totalRecords);
    } catch (err) {
      console.error('Erreur lors de la récupération des features :', err);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await FeatureService.deleteFeature(id);
      toast.success('Feature supprimée avec succès');
      fetchData(page, rows, searchQuery);
      navigate('/features');
    } catch (err) {
      toast.error('Une erreur est survenue lors de la suppression');
    }
  };

  // Permet de gérer les actions personnalisées dans le header du Datatable
  const headerCustomActions = () => <></>;

  // Permet de gérer les actions personnalisées dans la colonne action du Datatable
  const rowCustomActions = (rowData: IFeature) => <></>;

  return (
    <Datatable
      values={features}
      headerGenericActions={[]}
      headerCustomActions={headerCustomActions}
      rowGenericActions={['show', 'edit', 'delete']}
      rowCustomActions={rowCustomActions}
      totalRecords={totalRecords}
      onDeleteProp={onDelete}
      fetchData={fetchData}
    >
      <Column field="label" header="Label" />
      <Column
        field="isEnabled"
        header="Statut"
        body={(rowData: IFeature) => (
          <span
            className={`badge ${rowData.isEnabled ? 'badge-success' : 'badge-error'}`}
          >
            {rowData.isEnabled ? 'Activé' : 'Désactivé'}
          </span>
        )}
      />
      {/* <Column field="contactEmail" header="Mail de contact" /> */}
      {/* <Column
        field="createdAt"
        header="Date de création"
        body={(rowData: ITeam) => rowData.createdAt.toLocaleDateString('fr-FR')}
      /> */}
    </Datatable>
  );
};

export default FeatureIndexDatatable;

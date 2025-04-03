import { Key, useEffect, useState } from 'react';
import { IInfo } from '@/modules/Info/models/IInfo';
import InfoService from '@/modules/Info/services/InfoService';
import CardBody from '@/common/components/base/Card/CardBody';
import SearchBar from '@/common/components/base/Menu/SearchBar';
import Paginator from '@/common/components/advanced/Paginator/Paginator';
import InfoCard from '@/modules/Info/components/InfoCard';
import { toast } from 'react-toastify';

const InfoIndexGallery = () => {
  const [infos, setInfos] = useState<IInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [page] = useState(1);
  const [rows] = useState(12);
  const [teamId, setTeamId] = useState(0);
  const [totalRecords, setTotalRecords] = useState(infos.length);

  const handleTeam = async () => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      const parsedUser = JSON.parse(sessionUser);
      if (parsedUser.currentTeam) {
        setTeamId(parsedUser.currentTeam);
        return parsedUser.currentTeam;
      }
    }
    throw new Error('L\'équipe de l\'utilisateur n\'a pas été trouvée.');
  };

  const fetchData = async (
    page: number,
    offset: number,
    search?: string,
    teamId?: number
  ) => {
    try {
      const query = { page, offset, teamId, search };
      const res = await InfoService.getInfos(query);
      setInfos(res.data);
      setTotalRecords(res.totalRecords);
    } catch (err) {
      setError(
        'Erreur lors de la récupération des fiches infos. Veuillez recharger la page ou réessayer plus tard.'
      );
      console.error('Erreur lors de la récupération des infos', err);
    }
  };

  // Fonction exportée car asynchrone 
  const initialize = async () => {
    try {
      const currentTeam = await handleTeam();
      fetchData(page, rows, search, currentTeam);
    } catch (error) {
      setError('Erreur lors de la récupération de l\'équipe actuelle. Veuillez vérifier votre session.');
      toast.error('Erreur lors de la récupération de l\'équipe actuelle.');
    }
  };

  useEffect(() => {
    initialize();
  }, [search, teamId]);
  
  return (
    <>
      <CardBody className="border-t-0 py-4">
        <div className="flex flex-row justify-between items-center mx-4 mb-2">
          <SearchBar
            searchQuery={search}
            setSearchQuery={setSearch}
            onSubmit={(newSearch) => fetchData(page, rows, newSearch)}
          />
        </div>
        <div className="grid grid-cols-4 mx-2">
          {error && <h4>{error}</h4>}
          {!error && infos.length === 0 && (
            <h4>Aucune fiche info n'a été trouvée.</h4>
          )}
          {infos.length > 0 &&
            infos.map((info, index: Key | null | undefined) => (
              <InfoCard info={info} key={index} />
            ))}
        </div>
      </CardBody>
      <Paginator
        page={page}
        rows={rows}
        rowsPerPageOptions={[12, 24, 48]}
        totalRecords={totalRecords}
        fetchData={fetchData}
      />
    </>
  );
};

export default InfoIndexGallery;

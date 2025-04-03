import { useState, useEffect } from 'react';
import Button from '@/common/components/base/Button/Button';
import authService from '@/common/service/authService';
import { toast } from 'react-toastify';
import UserService from '@/modules/User/services/UserService';
import { IUser } from '@/modules/User/models/IUser';
import { ITeam } from '@/modules/Team/models/ITeam';
import { Link, useNavigate } from 'react-router-dom';
import Select from '@/common/components/advanced/Select/Select';

const MenuProfile: React.FC = () => {
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [user, setUser] = useState<IUser>();

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await authService.getMe();
      setUser(response.data);
      setSelectedTeamId(response.data.currentTeam?.id || null);

      const userSessionData = {
        id: response.data.id,
        username: response.data.username,
        currentTeam: response.data.currentTeam.id,
      };

      sessionStorage.setItem('user', JSON.stringify(userSessionData));

      setTeams(response.data.teams);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des informations utilisateur',
        error
      );
    }
  };

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      const parsedUser = JSON.parse(sessionUser);
      setSelectedTeamId(parsedUser.currentTeam?.id || null);
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (selectedTeamId !== null && selectedTeamId !== user?.currentTeam?.id) {
      changeTeam();
    }
  }, [selectedTeamId]);

  const changeTeam = async () => {
    if (!selectedTeamId) {
      return toast.error('Veuillez sélectionner une équipe');
    }

    if (!user?.id) {
      return toast.error('Utilisateur non trouvé');
    }

    try {
      await UserService.changeCurrentTeam(user.id, selectedTeamId);
      toast.success('Équipe changé avec succès');
      fetchUserData();
      navigate('/');
    } catch (error) {
      console.error("Erreur lors du changement d'équipe :", error);
      toast.error("Erreur lors du changement d'équipe");
    }
  };

  return (
    <div className="dropdown relative">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm btn-profile bg-base-100 flex items-center w-full"
      >
        {user?.username || 'Inconnu'}
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-neutral rounded-box z-[1] w-64 p-2 shadow flex flex-col items-center absolute inset-x-0 transform -translate-x-1/2 left-1/2 mt-2"
      >
        <li className="border-b border-neutral-content w-full">
          <div className="justify-center hover:underline hover:bg-neutral-content/10">
            <Link to={`/users/${user?.id}`}>Mon profil</Link>
          </div>
        </li>
        <li className="border-b border-neutral-content w-full text-center mb-3">
          <a>Team : {user?.currentTeam?.label || 'Aucune'}</a>
        </li>

        {/* Liste déroulante pour sélectionner une équipe */}
        {/* <li className="border-b border-neutral-content bg-base-200 w-full text-center mb-2 rounded-md mt-2">
          <select
            className="w-full bg-base-200 text-base-content"
            onChange={(e) => setSelectedTeamId(Number(e.target.value))}
            value={selectedTeamId || ''}
          >
            <option value="" disabled>
              Choisir une équipe
            </option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.label}
              </option>
            ))}
          </select>
        </li> */}

        <Select
          isMultiple={false}
          options={teams}
          getOptionLabel={(team) => team.label}
          getOptionValue={(team) => team.id.toString()}
          onChange={(value: ITeam[]) => {setSelectedTeamId(value[0].id)}}
          defaultValue={teams.filter((team) => team.id === selectedTeamId)}
          menuButtonStyle = 'bg-neutral border border-neutral-content/30'
        ></Select>

        {/* <li className="w-full text-center mt-3">
          <Button
            className="btn-primary disabled:opacity-50 disabled:bg-primary"
            onClick={changeTeam}
            disabled={selectedTeamId === user?.currentTeam?.id}
          >
            {'Changer de Team'}
          </Button>
        </li> */}
      </ul>
    </div>
  );
};

export default MenuProfile;

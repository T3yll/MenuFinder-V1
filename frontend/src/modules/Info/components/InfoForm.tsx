import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InfoService from '@/modules/Info/services/InfoService';
import TeamService from '@/modules/Team/services/TeamService';
import Button from '@/common/components/base/Button/Button';
import { validationSchema } from '@/modules/Info/models/InfoValidationSchema';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactFieldForm from '@/common/components/advanced/Forms/ContactFieldForm';
import LocalizationFieldForm from '@/common/components/advanced/Forms/LocalizationFieldForm';
import { useState, useEffect } from 'react';
import { ITeam } from '@/modules/Team/models/ITeam';
import { ISessionUser } from '@/modules/User/models/ISessionUser';
import Select from '@/common/components/advanced/Select/Select';

const InfoForm = ({ initialData }: { initialData?: any }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || {},
  });

  const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(!!initialData);
  const [currentUser, setCurrentUser] = useState<ISessionUser>();
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      setIsGeolocationEnabled(!!initialData);
    }
  }, [initialData]);

  // Récupère l'utilisateur depuis le sessionStorage et les équipes au lancement
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      const parsedUser = JSON.parse(sessionUser);
      setCurrentUser(parsedUser);
      setValue('userId', parsedUser.id);
      fetchTeams(parsedUser.id);
    }
  }, []);

  const fetchTeams = async (userId: number) => {
    try {
      const query = { page: 1, offset: 10, userId };
      const response = await TeamService.getTeams(query);
      setTeams(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des équipes', error);
      toast.error('Erreur lors de la récupération des équipes.');
    }
  };

  const onSubmit = async (data: any) => {
    data.teamIds = selectedTeams;
    try {
      if (initialData) {
        await InfoService.updateInfo(initialData.id, data);
        toast.success('Fiche Info modifiée avec succès !');
      } else {
        await InfoService.createInfo(data);
        toast.success('Fiche Info créée avec succès !');
      }
      navigate('/infos?tab=datatable');
    } catch (error) {
      console.error("Erreur lors de la soumission de l'info :", error);
      toast.error('Erreur lors de la soumission.');
    }
  };

  const toggleGeolocation = () => {
    setIsGeolocationEnabled((prev) => !prev);
  };

  const renderErrorMessage = (error: any) => {
    return error && typeof error === 'object' && 'message' in error ? (
      <p className="text-error text-sm">{error.message as string}</p>
    ) : null;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-base-100 p-6 rounded-lg shadow-md mx-auto text-start"
      id="info-form"
    >
      {/* Champ TITRE */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 text-base-content">
          TITRE
        </label>
        <input
          {...register('label')}
          className="w-full border-b border-neutral outline-none focus:border-primary bg-base-200 text-base-content p-2"
        />
        {renderErrorMessage(errors.label)}
      </div>

      {/* Champ DESCRIPTION */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 text-base-content">
          DESCRIPTION
        </label>
        <input
          {...register('description')}
          className="w-full p-2 border border-neutral rounded bg-base-200 text-base-content"
        />
        {renderErrorMessage(errors.description)}
      </div>

      {/* Champ CONTENU */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 text-base-content">
          CONTENU
        </label>
        <textarea
          {...register('content')}
          className="w-full p-2 border border-neutral rounded bg-base-200 text-base-content"
          rows={3}
        />
        {renderErrorMessage(errors.content)}
      </div>

      {/* Champ DATE EXPIRATION */}
      <label className="text-sm font-bold text-base-content">
        DATE EXPIRATION
      </label>
      <div className="mb-4 flex items-center gap-6">
        <input
          type="date"
          {...register('expirationDate')}
          className="min-w-[150px] p-2 border border-neutral rounded text-base-content bg-base-200"
          min={new Date().toISOString().split('T')[0]}
        />
        {renderErrorMessage(errors.expirationDate)}
      </div>

      {/* Checkbox Masquer et Épingler */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('isHidden')}
          className="toggle toggle-primary"
        />
        <span className="text-base-content">Masquer</span>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('isPinned')}
          className="toggle toggle-primary"
        />
        <span className="text-base-content">Épingler</span>
      </div>

      <div className="mb-4 flex flex-wrap -mx-2">
        {/* Champs User */}
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <label className="block text-sm font-bold mb-1 text-base-content">
            Crée par
          </label>
          <input
            type="text"
            value={currentUser?.username || ''}
            className="w-full p-1 border border-neutral rounded bg-base-200 text-base-content text-sm cursor-not-allowed"
            readOnly
          />
          {errors.userId && (
            <p className="text-error text-xs">
              {errors.userId.message as string}
            </p>
          )}
        </div>

        {/* Champs Team */}
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm font-bold mb-1 text-base-content">
            Équipe
          </label>
          <Select
            options={teams}
            getOptionLabel={(team) => team.label}
            getOptionValue={(team) => team.id.toString()}
            onChange={(value: ITeam[]) => setSelectedTeams(value.map((team: ITeam) => team.id))}
            isMultiple={true}
            defaultValue={initialData?.teams}
            isSearchable={true}
          />
          {errors.teamIds && (
            <p className="text-error text-xs">
              {errors.teamIds.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Bloc Informations de Contact */}
      <h3 className="text-lg font-bold text-base-content mb-2 mt-8">
        Informations de contact
      </h3>
      <div className="mb-6 p-4 border border-neutral rounded-lg bg-base-100">
        <ContactFieldForm register={register} errors={errors} />
      </div>

      {/* Bloc Informations de Localisation */}
      <h3 className="text-lg font-bold text-base-content mb-2">
        Informations de localisation
      </h3>
      <div className="mb-6 p-4 border border-neutral rounded-lg bg-base-100">
        <LocalizationFieldForm
          register={register}
          errors={errors}
          isGeolocationEnabled={isGeolocationEnabled}
        />
      </div>

      {/* Toggle pour activer/désactiver la géolocalisation */}
      <div className="mb-4 flex items-center space-x-2">
        <label className="text-sm font-bold text-base-content">
          Activer la géolocalisation
        </label>
        <input
          type="checkbox"
          checked={isGeolocationEnabled}
          onChange={toggleGeolocation}
          className="toggle toggle-primary"
        />
      </div>

      {/* Boutons Valider et Annuler */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          className="btn-warning"
          onClick={() => navigate(-1)}
        >
          Retour
        </Button>
        <Button form="info-form" type="submit" className="btn-success">
          Enregistrer
        </Button>
      </div>
    </form>
  );
};

export default InfoForm;

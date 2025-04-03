import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TeamService from '@/modules/Team/services/TeamService';
import Button from '@/common/components/base/Button/Button';
import { validationSchema } from '@/modules/Team/models/TeamValidationSchema';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactFieldForm from '@/common/components/advanced/Forms/ContactFieldForm';

const TeamForm = ({ initialData }: { initialData?: any }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = async (data: any) => {
    try {
      if (initialData) {
        await TeamService.updateTeam(initialData.id, data);
        toast.success('Équipe créée avec succès !');
      } else {
        await TeamService.createTeam(data);
        toast.success('Équipe créée avec succès !');
      }
      reset();
      navigate('/teams');
    } catch (error) {
      console.error("Erreur lors de la création de l'équipe :", error);
      toast.error('Erreur lors de la soumission.');
    }
  };

  const renderErrorMessage = (error: any) => {
    return error && typeof error === 'object' && 'message' in error ? (
      <p className="text-error text-sm">{error.message as string}</p>
    ) : null;
  };

  return (
    <form
      id="team-form"
      onSubmit={handleSubmit(onSubmit)}
      className="bg-base-100 p-6 rounded-lg shadow-md mx-auto max-w-2xl text-start"
    >
      {/* Nom de l'équipe */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 text-base-content">
          Nom de l'équipe
        </label>
        <input
          type="text"
          className="w-full p-2 border border-neutral rounded bg-base-200 text-base-content outline-none focus:border-primary"
          {...register('label')}
        />
        {renderErrorMessage(errors.label)}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 text-base-content">
          Description
        </label>
        <input
          type="text"
          className="w-full p-2 border border-neutral rounded bg-base-200 text-base-content outline-none focus:border-primary"
          {...register('description')}
        />
        {renderErrorMessage(errors.description)}
      </div>

      {/* Entête (letterHead) */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 text-base-content">
          Entête
        </label>
        <input
          type="text"
          className="w-full p-2 border border-neutral rounded bg-base-200 text-base-content outline-none focus:border-primary"
          {...register('letterHead')}
        />
        {renderErrorMessage(errors.letterHead)}
      </div>

      <ContactFieldForm register={register} errors={errors} />

      {/* Boutons */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          className="btn-warning"
          tooltip="Retour"
          onClick={() => navigate(-1)}
        >
          Retour
        </Button>
        <Button
          type="submit"
          form="team-form"
          className="btn-success"
          tooltip="Enregistrer"
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
};

export default TeamForm;

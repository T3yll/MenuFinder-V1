import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FeatureService from '@/modules/Feature/services/FeatureService';
import Button from '@/common/components/base/Button/Button';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '@/modules/Feature/models/FeatureValidationSchema';
import { toast } from 'react-toastify';

const FeatureForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await FeatureService.createFeature({
        ...data,
      });
      toast.success('Feature créée avec succès !');
      navigate('/features');
    } catch (error) {
      console.error('Erreur lors de la création de la feature:', error);
      toast.error('Erreur lors de la création.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-base-100 p-6 rounded-lg shadow-md mx-auto text-star" id="feature-form">
      {/* Nom de la feature */}
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1 text-base-content">NOM</label>
        <input
          {...register('label')}
          className="w-full border-b border-neutral outline-none focus:border-primary bg-base-200 text-base-content p-2"
        />
        {errors.label && <p className="text-error text-sm">{errors.label?.message}</p>}
      </div>

      {/* Toggle Activation */}
      <div className="pt-4 mb-2 flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('isEnabled')}
          className="toggle toggle-primary"
        />
        <span className="text-base-content">
          {errors.isEnabled ? "Désactivé" : "Activé"}
        </span>
      </div>

      {/* Boutons */}
      <div className="flex justify-end space-x-4">
        <Button type="button" className="btn-warning" onClick={() => navigate(-1)}>Retour</Button>
        <Button form="feature-form" type="submit" className="btn-success">Enregistrer</Button>
      </div>
    </form>
  );
};

export default FeatureForm;

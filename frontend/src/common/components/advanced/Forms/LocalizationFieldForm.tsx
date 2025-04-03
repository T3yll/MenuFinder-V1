import { LocalizationFieldFormProps } from '@/common/models/ILocalizationFieldFormProps';
import { FC } from 'react';

const LocalizationFieldForm: FC<LocalizationFieldFormProps> = ({
  register,
  errors,
  isGeolocationEnabled,
}) => {
  return (
    <div className="mb-4 grid grid-cols-3 gap-4">
      {isGeolocationEnabled && (
        <>
          <div>
            <label className="block text-sm font-bold mb-1 text-base-content">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              {...register('lattitude')}
              className="w-full p-1 border border-neutral rounded bg-base-200 text-base-content text-sm"
            />
            {errors.lattitude && (
              <p className="text-error text-xs">
                {errors.lattitude.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-base-content">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              {...register('longitude')}
              className="w-full p-1 border border-neutral rounded bg-base-200 text-base-content text-sm"
            />
            {errors.longitude && (
              <p className="text-error text-xs">
                {errors.longitude.message as string}
              </p>
            )}
          </div>

          {/* Altitude désactivée si géolocalisation est activée */}
          <div className="col-span-3">
            <label className="block text-sm font-bold mb-1 text-base-content">
              Altitude
            </label>
            <input
              type="number"
              step="any"
              {...register('altitude')}
              className="w-full p-1 border border-neutral rounded bg-base-200 text-base-content text-sm"
              disabled={!isGeolocationEnabled} // Désactive l'input si la géolocalisation est désactivée
            />
            {errors.altitude && (
              <p className="text-error text-xs">
                {errors.altitude.message as string}
              </p>
            )}
          </div>
        </>
      )}

      {/* Autres champs */}
      <div className="col-span-2">
        <label className="block text-sm font-bold mb-1 text-base-content">
          Rue
        </label>
        <input
          type="text"
          {...register('street')}
          className="w-full p-1 border border-neutral rounded bg-base-200 text-base-content text-sm"
        />
        {errors.street && (
          <p className="text-error text-xs">
            {errors.street.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-base-content">
          Ville
        </label>
        <input
          type="text"
          {...register('city')}
          className="w-full p-1 border border-neutral rounded bg-base-200 text-base-content text-sm"
        />
        {errors.city && (
          <p className="text-error text-xs">{errors.city.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-base-content">
          Code Postal
        </label>
        <input
          type="text"
          {...register('postalCode')}
          className="w-full p-1 border border-neutral rounded bg-base-200 text-base-content text-sm"
        />
        {errors.postalCode && (
          <p className="text-error text-xs">
            {errors.postalCode.message as string}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-bold mb-1 text-base-content">
          Pays
        </label>
        <input
          type="text"
          {...register('country')}
          className="w-full p-1 border border-neutral rounded bg-base-200 text-base-content text-sm"
        />
        {errors.country && (
          <p className="text-error text-xs">
            {errors.country.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default LocalizationFieldForm;

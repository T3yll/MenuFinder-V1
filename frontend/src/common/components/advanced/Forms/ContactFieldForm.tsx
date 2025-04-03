import { FC } from 'react';
import { ContactFieldFormProps } from '../../../models/IContactFieldFormProps';

const ContactFieldForm: FC<ContactFieldFormProps> = ({ register, errors }) => {
  return (
    <div className="mb-4 flex gap-4">
      <div className="w-1/2">
        <label className="block text-sm font-bold mb-1 text-base-content">Email de contact</label>
        <input 
          type="email"
          {...register('contactEmail')} 
          className="w-full p-2 border border-neutral rounded bg-base-200 text-base-content text-sm" 
        />
        {errors.contactEmail && <p className="text-error text-xs">{errors.contactEmail.message as string}</p>}
      </div>

      <div className="w-1/2">
        <label className="block text-sm font-bold mb-1 text-base-content">Téléphone de contact</label>
        <input 
          type="tel"
          {...register('contactPhone')} 
          className="w-full p-2 border border-neutral rounded bg-base-200 text-base-content text-sm" 
        />
        {errors.contactPhone && <p className="text-error text-xs">{errors.contactPhone.message as string}</p>}
      </div>
    </div>
  );
};

export default ContactFieldForm;

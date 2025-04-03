import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface LocalizationFieldFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isGeolocationEnabled: boolean;
}

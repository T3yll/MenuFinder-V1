import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface ContactFieldFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}
import * as yup from "yup";
import { validationMessages } from "@/common/constants/FormError/constants";

export const contactValidationSchema = {
  contactEmail: yup
    .string()
    .email(validationMessages.emailInvalid)
    .required(validationMessages.emailRequired),
  contactPhone: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, validationMessages.phoneInvalid)
    .required(validationMessages.phoneRequired),
};

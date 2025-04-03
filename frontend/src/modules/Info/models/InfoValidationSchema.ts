import { validationMessages } from "@/common/constants/FormError/constants";
import { contactValidationSchema } from "@/common/models/ContactValidationSchema";
import { localizationValidationSchema } from "@/common/models/LocalizationValidationSchema";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  label: yup.string().required(validationMessages.label),
  description: yup.string().required(validationMessages.description),
  content: yup.string().required(validationMessages.content),
  userId: yup.number().required(validationMessages.userId),
  expirationDate: yup
    .date()
    .nullable()
    .typeError(validationMessages.expirationDate),
  isHidden: yup.boolean(),
  isPinned: yup.boolean(),
  ...contactValidationSchema,
  ...localizationValidationSchema,
});
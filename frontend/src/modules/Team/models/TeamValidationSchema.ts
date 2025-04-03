import { validationMessages } from "@/common/constants/FormError/constants";
import { contactValidationSchema } from "@/common/models/ContactValidationSchema";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  label: yup.string().required(validationMessages.label),
  description: yup.string(),
  letterHead: yup.string().required(validationMessages.letterHead),
  ...contactValidationSchema,
});

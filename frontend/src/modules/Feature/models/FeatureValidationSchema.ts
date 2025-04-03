import { validationMessages } from "@/common/constants/FormError/constants";
import * as yup from "yup";

export const validationSchema = yup.object().shape({
  label: yup.string().required(validationMessages.label),
  isEnabled: yup.boolean(),
});


import * as yup from "yup";
import { validationMessages } from "@/common/constants/FormError/constants";

export const localizationValidationSchema = {
  lattitude: yup
    .number()
    .typeError(validationMessages.lattitudeInvalid)
    .min(-90, validationMessages.lattitudeInvalid)
    .max(90, validationMessages.lattitudeInvalid)
    .nullable(),
  longitude: yup
    .number()
    .typeError(validationMessages.longitudeInvalid)
    .min(-180, validationMessages.longitudeInvalid)
    .max(180, validationMessages.longitudeInvalid)
    .nullable(),
  altitude: yup
    .number()
    .typeError(validationMessages.altitudeInvalid)
    .nullable(),
  street: yup
    .string()
    .max(255, validationMessages.streetTooLong)
    .nullable(),
  city: yup
    .string()
    .max(100, validationMessages.cityTooLong)
    .nullable(),
  postalCode: yup
    .string()
    .matches(/^\d{5}$/, validationMessages.postalCodeInvalid)
    .nullable(),
  country: yup
    .string()
    .max(100, validationMessages.countryTooLong)
    .default("France")
    .nullable(),
};

export interface CreateAdressDto {
  number: number;
  street: string;
  city: string;
  postal_code: number;
  country: string;
  Longitude?: number;
  Latitude?: number;
}
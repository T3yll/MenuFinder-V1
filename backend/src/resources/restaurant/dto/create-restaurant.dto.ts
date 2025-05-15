import { IsNotEmpty, IsNumber, IsString, Min, MaxLength } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  adress_id: number;  // Utilise adresse_id comme dans l'entité

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  owner_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  image_file_id: number;
}
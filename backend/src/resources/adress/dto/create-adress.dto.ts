import { IsNotEmpty, IsNumber, IsString, Min, MaxLength } from 'class-validator';

export class CreateAdressDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  number: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  street: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsNotEmpty()
  @IsNumber()
  postal_code: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  country: string;
}
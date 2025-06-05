import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  username?: string; // Make username optional - we'll generate it if not provided

  @IsBoolean()
  @IsOptional()
  bAdmin: boolean = false;

  @IsNumber()
  @IsOptional()
  image_file_id?: number;
}
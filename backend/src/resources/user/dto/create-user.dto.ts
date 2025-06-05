import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

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

  @IsBoolean()
  @IsOptional()
  bAdmin: boolean = false;

  @IsNumber()
  @IsOptional()
  image_file_id?: number;
}
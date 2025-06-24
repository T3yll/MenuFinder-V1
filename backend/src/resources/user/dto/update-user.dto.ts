import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, IsNumber, IsOptional, MinLength, IsObject } from 'class-validator';

export class UpdateUserDto {
    @IsString()
      @IsNotEmpty()
      username: string;
    
      @IsString()
      @IsOptional()
      @MinLength(8)
      password: string;
    
      @IsString()
      @IsNotEmpty()
      nom: string;
    
      @IsString()
      @IsNotEmpty()
      prenom: string;
  
    @IsString()
    @IsOptional()
   image_file_id: string;
}

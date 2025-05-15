import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMealCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string; // Corrigé en string au lieu de number
}
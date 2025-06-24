import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMealCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
import { IsString, IsOptional } from 'class-validator';

export class UpdateMealCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
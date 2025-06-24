import { IsNotEmpty, IsNumber, IsString, IsOptional, Min, MaxLength, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  meal_category_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  image_file_id?: number;
}
import { IsNotEmpty, IsNumber, IsString, IsOptional, Min, MaxLength, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMealDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  menu_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  meal_category_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  image_file_id?: number;
}
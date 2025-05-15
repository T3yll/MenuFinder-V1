import { IsNotEmpty, IsNumber, IsString, Min, MaxLength, IsPositive } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  menu_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  meal_category_id: number;

  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  image_file_id: number;
}
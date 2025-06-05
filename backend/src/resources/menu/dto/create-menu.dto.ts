import { IsNotEmpty, IsNumber, IsString, IsOptional, Min, MaxLength, IsDecimal } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  restaurant_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
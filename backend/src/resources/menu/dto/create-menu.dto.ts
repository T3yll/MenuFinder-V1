import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  restaurant_id: number;
}
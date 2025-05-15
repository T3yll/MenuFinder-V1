import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateRestaurantTagDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  id_restaurant: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  id_tag: number;
}

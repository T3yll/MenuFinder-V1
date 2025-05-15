import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  restaurant_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  user_id: number;
}
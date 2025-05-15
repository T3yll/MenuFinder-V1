import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  restaurant_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  user_id: number;

  @IsNotEmpty()
  @IsString()
  text: string;

}
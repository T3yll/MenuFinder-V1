import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateResponseDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  review_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  user_id: number;

  @IsNotEmpty()
  @IsString()
  text: string;

}
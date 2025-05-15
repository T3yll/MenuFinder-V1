import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  path: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  type: string;
}
import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Optional()
  currentTeamId: number;

  @Optional()
  teams: number[];
}

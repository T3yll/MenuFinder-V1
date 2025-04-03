import { ContactFieldsDTO } from '@/common/decorators/dto/contact-fields-dto.decorator';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDetailDto } from './create-user-detail.dto';
import { Optional } from '@nestjs/common';

ContactFieldsDTO();
export class CreateUserDto extends PartialType(CreateUserDetailDto) {
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

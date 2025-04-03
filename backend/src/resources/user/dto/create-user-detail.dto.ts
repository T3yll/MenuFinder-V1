import { IsNumber, IsString, Length, MaxLength } from 'class-validator';

export class CreateUserDetailDto {
  @IsString()
  userRIO: string;

  @IsNumber()
  cheopsId: number;

  @IsNumber()
  dialogId: number;

  @IsNumber()
  assignmentServiceId: number;

  @IsNumber()
  operationalServiceId: number;

  @IsNumber()
  anonymizedOperationalServiceId: number;

  @IsNumber()
  anonymizedAssignmentServiceId: number;

  @IsNumber()
  rankId: number;

  @IsNumber()
  corpsId: number;

  @IsString()
  @MaxLength(1)
  statusCorpsId: string;

  @IsString()
  @MaxLength(1)
  responsabilityId: string;

  @IsString()
  salutation: string;

  @IsString()
  birthName: string;

  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  birthDate: Date;

  @IsString()
  phoneNumber: string;

  @IsString()
  mobilePhoneNumber: string;

  @IsString()
  email: string;

  @IsNumber()
  anonymityLevel: number;

  @IsNumber()
  reservist: number;
}

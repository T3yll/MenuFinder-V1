import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from '@/resources/team/dto/create-team.dto';
import { IsInt } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
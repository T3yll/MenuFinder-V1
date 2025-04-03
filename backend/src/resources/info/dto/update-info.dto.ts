import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoDto } from '@/resources/info/dto/create-info.dto';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {}

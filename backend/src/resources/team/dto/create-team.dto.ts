import { ContactFieldsDTO } from '@/common/decorators/dto/contact-fields-dto.decorator';
import { LocalizationFieldsDTO } from '@/common/decorators/dto/localization-fields-dto.decorator';
import { IsOptional, IsString } from 'class-validator';
@LocalizationFieldsDTO()
@ContactFieldsDTO()
export class CreateTeamDto {
  @IsString()
  label: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  letterHead?: string;
}

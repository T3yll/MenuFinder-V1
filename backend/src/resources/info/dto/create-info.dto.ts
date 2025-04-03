import { ContactFieldsDTO } from '@/common/decorators/dto/contact-fields-dto.decorator';
import { FileFieldsDTO } from '@/common/decorators/dto/file-fields-dto.decorator';
import { LocalizationFieldsDTO } from '@/common/decorators/dto/localization-fields-dto.decorator';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@ContactFieldsDTO()
@FileFieldsDTO()
@LocalizationFieldsDTO()
export class CreateInfoDto {
  @IsString()
  @MaxLength(100)
  readonly label: string;

  @IsString()
  @MaxLength(255)
  readonly description: string;

  @IsString()
  readonly content: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly expirationDate: Date;

  @IsBoolean()
  @IsOptional()
  readonly isHidden: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isPinned: boolean;

  @IsArray()
  @IsOptional()
  teamIds?: number[];
 
  @IsInt()
  @Type(() => Number)
  readonly userId: number;
}

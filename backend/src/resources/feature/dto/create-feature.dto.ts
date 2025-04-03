import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsBoolean()
  @IsNotEmpty()
  isEnabled: boolean;
}

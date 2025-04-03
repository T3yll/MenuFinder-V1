import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export function FileFieldsDTO() {
  return function (target: any) {
    Expose()(target.prototype, 'fileName');
    IsString()(target.prototype, 'fileName');
    IsOptional()(target.prototype, 'fileName');

    Expose()(target.prototype, 'filePath');
    IsString()(target.prototype, 'filePath');
    IsOptional()(target.prototype, 'filePath');

    Expose()(target.prototype, 'fileType');
    IsString()(target.prototype, 'fileType');
    IsOptional()(target.prototype, 'fileType');

    Expose()(target.prototype, 'fileSize');
    IsNumber()(target.prototype, 'fileSize');
    IsOptional()(target.prototype, 'fileSize');
  };
}

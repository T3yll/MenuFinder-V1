import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export function LocalizationFieldsDTO() {
  return function (target: any) {
    Expose()(target.prototype, 'lattitude');
    // IsDecimal()(target.prototype, 'lattitude');
    IsOptional()(target.prototype, 'lattitude');

    Expose()(target.prototype, 'longitude');
    // IsDecimal()(target.prototype, 'longitude');
    IsOptional()(target.prototype, 'longitude');

    Expose()(target.prototype, 'altitude');
    // IsDecimal()(target.prototype, 'altitude');
    IsOptional()(target.prototype, 'altitude');

    Expose()(target.prototype, 'street');
    IsString()(target.prototype, 'street');
    IsOptional()(target.prototype, 'street');

    Expose()(target.prototype, 'city');
    IsString()(target.prototype, 'city');
    IsOptional()(target.prototype, 'city');

    Expose()(target.prototype, 'postalCode');
    IsString()(target.prototype, 'postalCode');
    IsOptional()(target.prototype, 'postalCode');

    Expose()(target.prototype, 'country');
    IsString()(target.prototype, 'country');
    IsOptional()(target.prototype, 'country');
  };
}

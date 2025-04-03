import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export function ContactFieldsDTO() {
  return function (target: any) {
    Expose()(target.prototype, 'contactEmail');
    IsEmail()(target.prototype, 'contactEmail');
    IsOptional()(target.prototype, 'contactEmail');

    Expose()(target.prototype, 'contactPhone');
    IsPhoneNumber('FR')(target.prototype, 'contactPhone');
    IsOptional()(target.prototype, 'contactPhone');
  };
}

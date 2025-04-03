import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export function TimestampFields() {
  return function (constructor: Function) {
    CreateDateColumn()(constructor.prototype, 'createdAt');
    UpdateDateColumn()(constructor.prototype, 'updatedAt');
    Column({ type: 'boolean', default: true })(constructor.prototype, 'active');
  };
}

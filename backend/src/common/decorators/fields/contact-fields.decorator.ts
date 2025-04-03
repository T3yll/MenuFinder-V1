import { Column } from 'typeorm';

export function ContactFields() {
  return function (constructor: Function) {
    Column({ type: 'varchar', length: 255, nullable: true })(
      constructor.prototype,
      'contactEmail'
    );
    Column({ type: 'varchar', length: 20, nullable: true })(
      constructor.prototype,
      'contactPhone'
    );
  };
}

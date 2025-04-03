import { Column } from 'typeorm';

export function LocalizationFields() {
  return function (constructor: Function) {
    Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })(
      constructor.prototype,
      'lattitude'
    );
    Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })(
      constructor.prototype,
      'longitude'
    );
    Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })(
      constructor.prototype,
      'altitude'
    );
    Column({ type: 'varchar', length: 255, nullable: true })(
      constructor.prototype,
      'street'
    );
    Column({ type: 'varchar', length: 100, nullable: true })(
      constructor.prototype,
      'city'
    );
    Column({ type: 'varchar', length: 20, nullable: true })(
      constructor.prototype,
      'postalCode'
    );
    Column({
      type: 'varchar',
      length: 100,
      nullable: true,
      default: 'France',
    })(constructor.prototype, 'country');
  };
}

import { Column } from 'typeorm';

export function FileFields() {
  return function (constructor: Function) {
    Column({ type: 'varchar', length: 255, nullable: true })(
      constructor.prototype,
      'fileName'
    );
    Column({ type: 'varchar', length: 255, nullable: true })(
      constructor.prototype,
      'filePath'
    );
    Column({ type: 'varchar', length: 50, nullable: true })(
      constructor.prototype,
      'fileType'
    );
    Column({ type: 'int', nullable: true })(constructor.prototype, 'fileSize');
  };
}

import * as migration_20251111_173201 from './20251111_173201';

export const migrations = [
  {
    up: migration_20251111_173201.up,
    down: migration_20251111_173201.down,
    name: '20251111_173201'
  },
];

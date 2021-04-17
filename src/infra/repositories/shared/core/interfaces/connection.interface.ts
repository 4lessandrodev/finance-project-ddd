import { FilterInterface } from './generic-repository.interface';

export interface ConnectionInterface<TargetEntity> {
  save: (entity: TargetEntity) => Promise<void | TargetEntity>;
  delete: () => Promise<void | TargetEntity>;
  find: (filter: FilterInterface) => Promise<TargetEntity[]>;
  exist: (filter: FilterInterface) => Promise<boolean>;
}

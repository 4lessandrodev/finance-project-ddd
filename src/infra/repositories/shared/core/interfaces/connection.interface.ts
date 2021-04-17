import { FilterInterface } from './generic-repository.interface';

export interface ConnectionInterface<TargetEntity> {
  save: (entity: TargetEntity) => Promise<void | TargetEntity>;
  delete: (id: string) => Promise<void | TargetEntity>;
  find: (filter: FilterInterface) => Promise<TargetEntity[] | null>;
}

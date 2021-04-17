import { FilterInterface } from './generic-repository.interface';

export interface ConnectionInterface<TargetEntity, ORM> {
  save: (entity: TargetEntity) => Promise<void | TargetEntity>;
  delete: (id: string) => Promise<void | TargetEntity>;
  find: (filter: FilterInterface) => Promise<TargetEntity[] | null>;
  orm: () => ORM;
}

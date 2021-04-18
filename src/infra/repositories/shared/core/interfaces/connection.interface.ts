import { FilterInterface } from './generic-repository.interface';

/**
 * `TargetEntity` as Entity to persist on database and
 * `ORM` as instance or connection or installed ORM
 * @example UserPersistence from infra
 * @example TypeORM installed instance
 *
 * @method save:
 * @method delete:
 * @method find:
 * @method orm:
 */
export interface ConnectionInterface<TargetEntity, ORM> {
  save: (entity: TargetEntity) => Promise<void | TargetEntity>;
  delete: (id: string) => Promise<void | TargetEntity>;
  find: (filter: FilterInterface) => Promise<TargetEntity[] | null>;
  orm: () => ORM;
}

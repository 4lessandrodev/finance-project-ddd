export interface FilterInterface {
  [key: string]: string | number;
}

/**
 * `TargetPersistence` as Entity to persist on database and
 * `DomainAggregate` as Aggregate Entity
 * `ORM` as instance or connection or installed ORM
 * @example UserPersistence from infra
 * @example UserAggregate from domain
 * @example ORM return method types `findOne` `finMany` ...
 *
 */
export interface GenericRepositoryInterface<
  TargetPersistence,
  DomainAggregate,
  ORM
> {
  save: (entity: TargetPersistence) => Promise<void>;
  delete: (id: string) => Promise<void>;
  find: (filter: FilterInterface) => Promise<DomainAggregate[] | null>;
  exist: (filter: FilterInterface) => Promise<boolean>;
  orm: () => ORM;
}

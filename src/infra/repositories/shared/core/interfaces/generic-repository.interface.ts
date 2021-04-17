export interface FilterInterface {
  [key: string]: string | number;
}

export interface GenericRepositoryInterface<
  TargetPersistence,
  DomainAggregate
> {
  save: (entity: TargetPersistence) => Promise<void>;
  delete: (id: string) => Promise<void>;
  find: (filter: FilterInterface) => Promise<DomainAggregate[] | null>;
  exist: (filter: FilterInterface) => Promise<boolean>;
}

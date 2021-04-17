export interface FilterInterface {
  [key: string]: string | number;
}

export interface GenericRepositoryInterface<
  TargetPersistence,
  DomainAggregate
> {
  save: (entity: TargetPersistence) => Promise<void>;
  delete: () => Promise<void>;
  find: (filter: FilterInterface) => Promise<DomainAggregate[]>;
  exist: (filter: FilterInterface) => Promise<boolean>;
}

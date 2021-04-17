export interface FilterInterface {
  [key: string]: string | number;
}

export interface GenericRepositoryInterface<UserPersistence> {
  save: () => Promise<void>;
  delete: () => Promise<void>;
  find: (filter: FilterInterface) => Promise<UserPersistence[]>;
  exist: (filter: FilterInterface) => Promise<boolean>;
}

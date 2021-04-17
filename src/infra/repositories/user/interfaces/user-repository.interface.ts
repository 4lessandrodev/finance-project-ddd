import { GenericRepositoryInterface } from '@infra/repositories/shared';

export type UserRepositoryInterface<
  UserPersistence,
  DomainAggregate
> = GenericRepositoryInterface<UserPersistence, DomainAggregate>;

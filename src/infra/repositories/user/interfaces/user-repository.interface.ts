import { GenericRepositoryInterface } from '@infra/repositories/shared';

/**
 * `UserPersistence` as Entity to persist on database and
 * `DomainAggregate` as Aggregate Entity
 * @example UserPersistence from infra
 * @example UserAggregate from domain
 *
 * @extends GenericRepositoryInterface
 * @see GenericRepositoryInterface
 */
export type UserRepositoryInterface<
  UserPersistence,
  UserAggregate,
  ORM
> = GenericRepositoryInterface<UserPersistence, UserAggregate, ORM>;

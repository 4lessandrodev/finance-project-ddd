import { GenericRepositoryInterface } from '@infra/repositories/shared';

export interface UserRepositoryInterface<UserPersistence, DomainAggregate, ORM>
  extends GenericRepositoryInterface<UserPersistence, DomainAggregate> {
  methods: () => ORM;
}

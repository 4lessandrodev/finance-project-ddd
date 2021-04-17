import { GenericRepositoryInterface } from '@infra/repositories/shared';

export interface UserRepositoryInterface<UserPersistence, ORM>
  extends GenericRepositoryInterface<UserPersistence> {
  methods: () => ORM;
}

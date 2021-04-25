import { Inject, Injectable } from '@nestjs/common';
import { MapperInterface } from '@infra/repositories/shared';
import { ConnectionInterface } from '../shared/core/interfaces/connection.interface';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { GenericAbstractRepository } from '../shared/core/generic-abstract.repository';
import { UserPersistence } from './interfaces/user-persistence.interface';
import { UserAggregate } from '@domain/user/aggregates';

/**
 * @todo Inject real ORM
 */
// fake Orm
const ORM = {
  findOne: () => 1,
};
type typeORM = typeof ORM;
@Injectable()

/**
 * `UserPersistence` typeof Entity to persist on database
 * `UserAggregate` typeof Domain entity
 * `ORM` type of ORM or connection instance
 * @implements UserRepositoryInterface
 * @see UserRepositoryInterface if needs new methods
 */
export class UserRepository
  extends GenericAbstractRepository<UserPersistence, UserAggregate, typeORM>
  implements UserRepositoryInterface<UserPersistence, UserAggregate, typeORM> {
  /**
   *
   * @param connection instance of ORM or database connection
   * @param mapper instance of `UserMapper`
   */
  constructor(
    @Inject('Connection')
    protected readonly connection: ConnectionInterface<
      UserPersistence,
      typeORM
    >,
    @Inject('Mapper')
    protected readonly mapper: MapperInterface<UserPersistence, UserAggregate>,
  ) {
    super(connection, mapper);
  }
}

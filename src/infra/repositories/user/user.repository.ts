import { Inject, Injectable } from '@nestjs/common';
import { MapperInterface } from '@infra/repositories/shared';
import { ConnectionInterface } from '../shared/core/interfaces/connection.interface';
import { UserRepositoryInterface } from './interfaces/user-repository.interface';
import { GenericAbstractRepository } from '../shared/core/generic-abstract.repository';

@Injectable()
/**
 * `UserPersistence` typeof Entity to persist on database
 * `UserAggregate` typeof Domain entity
 * `ORM` type of ORM or connection instance
 * @implements UserRepositoryInterface
 * @see UserRepositoryInterface if needs new methods
 */
export class UserRepository<UserPersistence, UserAggregate, ORM>
  extends GenericAbstractRepository<UserPersistence, UserAggregate, ORM>
  implements UserRepositoryInterface<UserPersistence, UserAggregate, ORM> {
  /**
   *
   * @param connection instance of ORM or database connection
   * @param mapper instance of `UserMapper`
   */
  constructor(
    @Inject('Connection')
    protected readonly connection: ConnectionInterface<UserPersistence, ORM>,
    @Inject('Mapper')
    protected readonly mapper: MapperInterface<UserPersistence, UserAggregate>,
  ) {
    super(connection, mapper);
  }
}

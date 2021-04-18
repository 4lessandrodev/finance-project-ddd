import {
  FilterInterface,
  ConnectionInterface,
  GenericRepositoryInterface,
  MapperInterface,
} from '@infra/repositories/shared';

/**
 * `UserPersistence` as Entity to persist on database and
 * `DomainAggregate` as Aggregate Entity
 * `ORM` as instance or connection or installed ORM
 * @example UserPersistence from infra
 * @example UserAggregate from domain
 * @example ORM return method types `findOne` `finMany` ...
 *
 * @implements GenericRepositoryInterface
 * @see GenericRepositoryInterface
 */
export abstract class GenericAbstractRepository<
  TargetPersistence,
  DomainAggreate,
  ORM
> implements
    GenericRepositoryInterface<TargetPersistence, DomainAggreate, ORM> {
  /**
   *
   * @param connection instance of ORM connection
   * @param mapper instance of entity mapper
   *
   * @example
   * ConnectionInterface<TargetPersistence, ORM>,
   *
   * @example
   * MapperInterface<TargetPersistence, DomainAggreate >,
   */
  constructor(
    protected readonly connection: ConnectionInterface<TargetPersistence, ORM>,
    protected readonly mapper: MapperInterface<
      TargetPersistence,
      DomainAggreate
    >,
  ) {}

  async save(entity: TargetPersistence): Promise<void> {
    await this.connection.save(entity);
  }

  async delete(id: string): Promise<void> {
    const entityExist = await this.exist({ id });
    if (entityExist) {
      await this.connection.delete(id);
    }
  }

  async find(filter: FilterInterface): Promise<DomainAggreate[] | null> {
    const foundRegisters = await this.connection.find(filter);

    if (!foundRegisters) {
      return null;
    }

    const foundRegistersAsDomain = foundRegisters.map((register) =>
      this.mapper.toDomain(register),
    );

    return foundRegistersAsDomain;
  }

  async exist(filter: FilterInterface): Promise<boolean> {
    const exist = await this.connection.find(filter);
    return !!exist;
  }

  orm(): ORM {
    return this.connection.orm();
  }
}

import { ConnectionInterface } from './interfaces/connection.interface';
import {
  FilterInterface,
  GenericRepositoryInterface,
} from './interfaces/generic-repository.interface';
import { MapperInterface } from './interfaces/mapper.interface';

export abstract class GenericAbstractRepository<
  TargetPersistence,
  DomainAggreate,
  ORM
> implements GenericRepositoryInterface<TargetPersistence, DomainAggreate> {
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
      this.connection.delete(id);
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

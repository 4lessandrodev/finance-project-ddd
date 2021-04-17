import { ConnectionInterface } from './interfaces/connection.interface';
import {
  FilterInterface,
  GenericRepositoryInterface,
} from './interfaces/generic-repository.interface';

export abstract class GenericAbstractRepository<
  TargetPersistence,
  DomainAggreate
> implements GenericRepositoryInterface<TargetPersistence, DomainAggreate> {
  constructor(
    private readonly connection: ConnectionInterface<TargetPersistence>,
    private readonly mapper: any,
  ) {}

  async save(entity: TargetPersistence): Promise<void> {
    console.log(entity);

    return;
  }

  async delete(): Promise<void> {
    this.connection;
    return;
  }

  async find(filter: FilterInterface): Promise<DomainAggreate[]> {
    console.log(filter);

    const target = [{ target: 'value' }];
    this.mapper;
    return (target as unknown) as DomainAggreate[];
  }

  async exist(filter: FilterInterface): Promise<boolean> {
    console.log(filter);

    return true;
  }
}

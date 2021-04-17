import { GenericAbstractRepository } from './generic-abstract.repository';
import { ConnectionInterface } from './interfaces/connection.interface';
import { MapperInterface } from './interfaces/mapper.interface';

describe('generic-abstract.repository', () => {
  // Define an ORM type
  const ORM = {
    findOne: () => 1,
    findMany: () => [1, 2, 3],
    exist: () => true,
  };

  type typeORM = typeof ORM;
  //
  // Mock connection
  const connection: ConnectionInterface<any, typeORM> = {
    delete: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    orm: () => ORM,
  };
  // Mapper mock
  const mapper: MapperInterface<any, any> = {
    toDomain: jest.fn(),
    toPersistence: jest.fn(),
  };
  //
  const mockRepo = class mock extends GenericAbstractRepository<
    string,
    any,
    typeORM
  > {};

  it('should be definied', () => {
    const instance = new mockRepo(connection, mapper);
    expect(instance).toBeDefined();
  });

  it('should not call delete method from connection if register does not exist', async () => {
    const instance = new mockRepo(connection, mapper);

    //Mock find methos, it is used on delete method
    jest.spyOn(instance, 'exist').mockResolvedValueOnce(false);

    //
    await instance.delete('valid_id');
    expect(connection.delete).not.toHaveBeenCalled();
  });

  it('should call find method', () => {
    const instance = new mockRepo(connection, mapper);
    instance.find({ id: 'valid_id' });
    expect(connection.find).toHaveBeenCalled();
  });

  it('should call save method', () => {
    const instance = new mockRepo(connection, mapper);
    instance.save('valid_entity');
    expect(connection.save).toHaveBeenCalled();
  });

  it('should call find method', async () => {
    const instance = new mockRepo(connection, mapper);
    //
    //Mock find methos
    jest.spyOn(connection, 'find').mockResolvedValueOnce(['teste']);
    //
    await instance.exist({ email: 'valid_email@mail.com' });
    expect(connection.find).toHaveBeenCalled();
  });

  it('should call delete method from connection', async () => {
    const instance = new mockRepo(connection, mapper);

    //Mock find methos, it is used on delete method
    jest.spyOn(instance, 'exist').mockResolvedValueOnce(true);

    await instance.delete('valid_id');
    expect(connection.delete).toHaveBeenCalled();
  });

  it('should call orm method from connection', () => {
    const instance = new mockRepo(connection, mapper);

    const orm = instance.orm();
    expect(orm.findOne()).toBe(1);
  });
});

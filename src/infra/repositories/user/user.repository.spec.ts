import { UserAggregate } from '@domain/user/aggregates';
import { ConnectionInterface } from '@infra/repositories/shared';
import {
  UserPersistence,
  UserRepositoryInterface,
  UserMapper,
  UserRepository,
} from '@infra/repositories/user';

describe('user.repository', () => {
  // fake Orm
  const ORM = {
    findOne: () => 1,
  };
  type typeORM = typeof ORM;

  // Fake connection
  const connection: ConnectionInterface<UserPersistence, typeORM> = {
    delete: jest.fn(),
    find: jest.fn(),
    orm: () => ORM,
    save: jest.fn(),
  };

  // fake User repository
  let userRepo: UserRepositoryInterface<
    UserPersistence,
    UserAggregate,
    typeORM
  >;

  // Instatiate user repository
  beforeAll(() => {
    userRepo = new UserRepository(connection, new UserMapper());
  });

  it('should be definied', () => {
    expect(userRepo).toBeDefined();
  });

  it('should call orm method', () => {
    const result = userRepo.orm().findOne();
    expect(result).toBe(1);
  });

  it('should call delete method', async () => {
    jest.spyOn(userRepo, 'exist').mockResolvedValueOnce(true);
    await userRepo.delete('valid_id');
    expect(connection.delete).toHaveBeenCalled();
  });

  it('should call find method', async () => {
    await userRepo.find({ id: 'valid_id' });

    expect(connection.find).toHaveBeenCalled();
  });

  it('should call save method', async () => {
    await userRepo.save('valid_id' as any);
    expect(connection.save).toHaveBeenCalled();
  });
});

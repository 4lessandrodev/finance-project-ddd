import { IUserRepository } from '@repo/user.repository.interface';
import { Filter } from 'types-ddd/dist/src';
import { UserAggregate } from '@domain/user/aggregates';
import { UserMapper } from './user.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.schema';
import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  // Inject mapper and connection
  constructor(
    @Inject(UserMapper) private readonly mapper: UserMapper,
    @InjectModel(User.name) private readonly conn: Model<UserDocument>,
  ) {}
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  find(filter: Filter): Promise<UserAggregate[] | null> {
    throw new Error('Method not implemented');
  }
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(filter: Filter): Promise<UserAggregate | null> {
    throw new Error('Method not implemented');
  }
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(filter: Filter): Promise<void> {
    throw new Error('Method not implemented');
  }
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exists(filter: Filter): Promise<boolean> {
    throw new Error('Method not implemented');
  }
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(target: UserAggregate): Promise<void> {
    throw new Error('Method not implemented');
  }
  //
}

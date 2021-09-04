import { IBaseRepository } from 'types-ddd';
import { UserAggregate } from '../domain';
import { User } from '@infra/user/entities/user.schema';

export type IUserRepository = IBaseRepository<UserAggregate, User>;

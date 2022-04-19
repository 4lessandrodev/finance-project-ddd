import { IBaseRepository } from 'types-ddd';
import { UserAggregate } from '../user.aggregate';
import { IUser } from '@shared/index';

export type IUserRepository = IBaseRepository<UserAggregate, IUser>;

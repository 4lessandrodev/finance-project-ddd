import { IBaseRepository } from 'types-ddd';
import { UserAggregate } from '../user.aggregate';
import IUser from '@shared/interfaces/user-model.interface';

export type IUserRepository = IBaseRepository<UserAggregate, IUser>;

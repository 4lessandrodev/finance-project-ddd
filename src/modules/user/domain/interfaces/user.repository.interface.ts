import { IBaseRepository } from 'types-ddd';
import { User } from '@modules/user/infra/entities/user.schema';
import { UserAggregate } from '../user.aggregate';

export type IUserRepository = IBaseRepository<UserAggregate, User>;

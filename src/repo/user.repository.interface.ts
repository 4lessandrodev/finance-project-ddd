import { IBaseRepository } from 'types-ddd';
import { UserAggregate } from '../domain';

export type IUserRepository = IBaseRepository<UserAggregate>;

import { UserAggregate } from '@domain/user/aggregates';
import {
  DateValueObject,
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '@domain/user/value-objects';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { BudgetIdValueObject } from '../../../domain';
import { User } from '../entities/user.schema';
import { UserMapper } from './user.mapper';

describe('user.mapper', () => {
  //
  const currentDate = new Date();
  //
  let domain: UserAggregate;
  let persistence: User;
  //
  beforeAll(() => {
    // Create user from domain
    domain = UserAggregate.create(
      {
        email: EmailValueObject.create('valid_mail@domain.com').getResult(),
        password: PasswordValueObject.create('valid_password').getResult(),
        totalBalanceAvailable: 0,
        budgetBoxIds: [
          BudgetIdValueObject.create(
            new UniqueEntityID('valid_id_1'),
          ).getResult(),
          BudgetIdValueObject.create(
            new UniqueEntityID('valid_id_2'),
          ).getResult(),
        ],
        terms: [
          TermValueObject.create({
            acceptedAt: DateValueObject.create(currentDate).getResult(),
            ip: IpValueObject.create('45.192.110.42').getResult(),
            userAgent: {
              name: 'firefox',
              os: 'LINUX',
              type: 'browser',
              version: '80.0.1',
            },
          }).getResult(),
        ],
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      new UniqueEntityID('valid_id'),
    ).getResult();

    // Create persistence user
    persistence = {
      budgetBoxIds: ['valid_id_1', 'valid_id_2'],
      createdAt: currentDate,
      email: 'valid_mail@domain.com',
      id: 'valid_id',
      password: 'valid_password',
      terms: [
        {
          ip: '45.192.110.42',
          acceptedAt: currentDate,
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        },
      ],
      totalBalanceAvailable: 0,
      updatedAt: currentDate,
    };
  });
  //
  it('should be defined', () => {
    const mapper = new UserMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert object from persistence to domain', () => {
    const mapper = new UserMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });

  it('should convert object from domain to persistence', () => {
    const mapper = new UserMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });
});

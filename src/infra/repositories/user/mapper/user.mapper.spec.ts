import { UserAggregate } from '@domain/user/aggregates';
import { DateValueObject, UniqueEntityID } from '@domain/shared';
import { UserPersistence } from '../interfaces/user-persistence.interface';
import { BudgetIdValueObject } from '@domain/budget-box/value-objects';
import {
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '@domain/user/value-objects';
import { UserMapper } from './user.mapper';

describe('user.mapper', () => {
  //
  let userAggregate: UserAggregate;
  let userEntity: UserPersistence;
  const mapper = new UserMapper();
  //

  beforeAll(() => {
    //
    //Create a domain aggregate
    userAggregate = UserAggregate.create(
      {
        email: EmailValueObject.create('valid_mail@domain.com').getResult(),
        password: PasswordValueObject.create('valid_password').getResult(),
        totalBalanceAvaliable: 0,
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
            acceptedAt: DateValueObject.create(
              new Date('2021-01-01T13:00:00.000Z'),
            ).getResult(),
            ip: IpValueObject.create('45.192.110.42').getResult(),
            userAgent: {
              name: 'firefox',
              os: 'LINUX',
              type: 'browser',
              version: '80.0.1',
            },
          }).getResult(),
        ],
        createdAt: new Date('2021-01-01T13:00:00.000Z'),
        deletedAt: undefined,
        isDeleted: false,
        updatedAt: new Date('2021-01-01T13:00:00.000Z'),
      },
      new UniqueEntityID('IU98-DF5.089DSFH0.00985JDFG5'),
    ).getResult();

    //
    // Create a persistence object
    userEntity = {
      id: 'IU98-DF5.089DSFH0.00985JDFG5',
      email: 'valid_mail@domain.com',
      password: 'valid_password',
      terms: [
        {
          acceptedAt: '2021-01-01T13:00:00.000Z',
          ip: '45.192.110.42',
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        },
      ],
      totalBalanceAvaliable: 0,
      budgetBoxIds: ['valid_id_1', 'valid_id_2'],
      createdAt: '2021-01-01T13:00:00.000Z',
      isDeleted: false,
      updatedAt: '2021-01-01T13:00:00.000Z',
      deletedAt: undefined,
    };
    //
  });

  it('should convert from domain to perssitence with success', () => {
    const result = mapper.toPersistence(userAggregate);

    expect(result).toBeDefined();
    expect(result).toEqual(userEntity);
  });

  it('should convert from perssitence to domain with success', () => {
    const result = mapper.toDomain(userEntity);

    expect(result).toBeDefined();
    expect(result).toEqual(userAggregate);
  });
});

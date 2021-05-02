import { UserAggregate } from './user.aggregate';
import { BudgetIdValueObject } from '@domain/budget-box/value-objects';
import {
  DateValueObject,
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '@domain/user/value-objects';
import { UniqueEntityID } from 'types-ddd';

describe('user.aggregate', () => {
  it('should create a valid user', () => {
    const user = UserAggregate.create({
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
          acceptedAt: DateValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('45.192.110.42').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
    });

    expect(user.isSuccess).toBe(true);
  });

  it('should get valid values', () => {
    const user = UserAggregate.create({
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
          acceptedAt: DateValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('45.192.110.42').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
    });

    const userResult = user.getResult();

    expect(userResult.id).toBeDefined();
    expect(userResult.createdAt).toBeDefined();
    expect(userResult.email.value).toBe('valid_mail@domain.com');
    expect(userResult.isDeleted).toBeFalsy();
    expect(userResult.password.value).toBe('valid_password');
    expect(userResult.totalBalanceAvailable).toBe(0);
    expect(userResult.terms[0].terms.acceptedAt.value).toBeDefined();
    expect(userResult.terms[0].terms.ip.value).toBe('45.192.110.42');
    expect(userResult.terms[0].terms.userAgent).toEqual({
      name: 'firefox',
      os: 'LINUX',
      type: 'browser',
      version: '80.0.1',
    });

    const validsIds = userResult.budgetBoxIds.map((idValueObject) =>
      idValueObject.id.toValue(),
    );

    expect(validsIds).toEqual(['valid_id_1', 'valid_id_2']);
  });

  it('should return empty array if not provide budgetBoxIds', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('valid_mail@domain.com').getResult(),
      password: PasswordValueObject.create('valid_password').getResult(),
      totalBalanceAvailable: 0,
      terms: [
        TermValueObject.create({
          acceptedAt: DateValueObject.create(new Date()).getResult(),
          ip: IpValueObject.create('45.192.110.42').getResult(),
          userAgent: {
            name: 'firefox',
            os: 'LINUX',
            type: 'browser',
            version: '80.0.1',
          },
        }).getResult(),
      ],
    });

    expect(user.getResult().budgetBoxIds).toEqual([]);
  });

  it('should create a valid user with provided id', () => {
    const user = UserAggregate.create(
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
            acceptedAt: DateValueObject.create(new Date()).getResult(),
            ip: IpValueObject.create('45.192.110.42').getResult(),
            userAgent: {
              name: 'firefox',
              os: 'LINUX',
              type: 'browser',
              version: '80.0.1',
            },
          }).getResult(),
        ],
      },
      new UniqueEntityID('valid_id'),
    );

    expect(user.getResult().id.toValue()).toBe('valid_id');
  });
});

import { UniqueEntityID } from '../../../shared';
import {
  AcceptedAtValueObject,
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '../../value-objects';
import { UserAggregate } from './user.aggregate';

describe('user.aggregate', () => {
  it('should create a valid user', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('valid_mail@domain.com').getResult(),
      password: PasswordValueObject.create('valid_password').getResult(),
      totalBalanceAvaliable: 0,
      budgetBoxIds: ['valid_id_1', 'valid_id_2'],
      terms: [
        TermValueObject.create({
          acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
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
      totalBalanceAvaliable: 0,
      budgetBoxIds: ['valid_id_1', 'valid_id_2'],
      terms: [
        TermValueObject.create({
          acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
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
    expect(userResult.totalBalanceAvaliable).toBe(0);
    expect(userResult.terms[0].value.acceptedAt.value).toBeDefined();
    expect(userResult.terms[0].value.ip.value).toBe('45.192.110.42');
    expect(userResult.terms[0].value.userAgent).toEqual({
      name: 'firefox',
      os: 'LINUX',
      type: 'browser',
      version: '80.0.1',
    });
    expect(userResult.budgetBoxIds).toEqual(['valid_id_1', 'valid_id_2']);
  });

  it('should return empty array if not provide budgetBoxIds', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('valid_mail@domain.com').getResult(),
      password: PasswordValueObject.create('valid_password').getResult(),
      totalBalanceAvaliable: 0,
      terms: [
        TermValueObject.create({
          acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
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
        totalBalanceAvaliable: 0,
        budgetBoxIds: ['valid_id_1', 'valid_id_2'],
        terms: [
          TermValueObject.create({
            acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
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

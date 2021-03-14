import { AcceptedAtValueObject } from '../../value-objects/accepted-at/accepted-at.value-object';
import { EmailValueObject } from '../../value-objects/email/email.value-object';
import { IpValueObject } from '../../value-objects/ip/ip.value-object';
import { PasswordValueObject } from '../../value-objects/password/password.value-object';
import { TermValueObject } from '../../value-objects/term/term.value-object';
import { UserAggregate } from './user.aggregate';

describe('user.aggregate', () => {
  it('should create a valid user', () => {
    const user = UserAggregate.create({
      email: EmailValueObject.create('valid_mail@domain.com').getResult(),
      password: PasswordValueObject.create('valid_password').getResult(),
      totalBalanceAvaliable: 0,
      terms: TermValueObject.create({
        acceptedAt: AcceptedAtValueObject.create(new Date()).getResult(),
        ip: IpValueObject.create('45.192.110.42').getResult(),
        userAgent: {
          name: 'firefox',
          os: 'LINUX',
          type: 'browser',
          version: '80.0.1',
        },
      }).getResult(),
    });
    expect(user.isSuccess).toBe(true);
  });
});

import { EmailValueObject } from './email-value-object';
describe('email-value-object.ts', () => {
  it('should return a valid email', () => {
    const email = EmailValueObject.create('valid_mail@domain.com');

    expect(email.isFailure).toBe(false);
    expect(email.getResult().value).toBe('valid_mail@domain.com');
  });
});

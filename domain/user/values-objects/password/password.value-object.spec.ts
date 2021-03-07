import { PasswordValueObject } from './password.value-object';

describe('password.value-object', () => {
  it('should return a valid password', () => {
    const password = PasswordValueObject.create('123abc');
    expect(password.isSuccess).toBe(true);
    expect(password.getResult().value).toBe('123abc');
  });

  it('should return fail if provide a password greatter than 15 char', () => {
    const password = PasswordValueObject.create(
      'invalid_password_greatter_than_15_char',
    );

    expect(password.isFailure).toBe(true);
    expect(password.error).toBe('Password max length 15 char');
  });
});

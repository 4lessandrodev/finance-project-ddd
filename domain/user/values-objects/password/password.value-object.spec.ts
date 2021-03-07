import { PasswordValueObject } from './password.value-object';

describe('password.value-object', () => {
  it('should create a valid password', () => {
    const password = PasswordValueObject.create('123abc');

    expect(password.isSuccess).toBe(true);
    expect(password.getResult().value).toBe('123abc');
  });

  it('should fail if password is not on range min 3 char and max 20 char', () => {
    const shortPassword = PasswordValueObject.create('i');
    expect(shortPassword.isFailure).toBe(true);
    expect(shortPassword.error).toBe(
      'Password must have min 3 char and max 20 char',
    );
    const longPassword = PasswordValueObject.create(
      'invalid_long_password_to_validate_password_must_have_max_20_char',
    );
    expect(longPassword.isFailure).toBe(true);
    expect(longPassword.error).toBe(
      'Password must have min 3 char and max 20 char',
    );
  });
});

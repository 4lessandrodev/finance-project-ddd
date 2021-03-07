import { Result, ValueObject } from '../../../shared';

export interface PasswordValueObjectProps {
  value: string;
}

export class PasswordValueObject extends ValueObject<PasswordValueObjectProps> {
  private constructor(props: PasswordValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(password: string): Result<PasswordValueObject> {
    const isValidLength = password.length < 15;

    if (!isValidLength) {
      return Result.fail<PasswordValueObject>('Password max length 15 char');
    }

    return Result.ok<PasswordValueObject>(
      new PasswordValueObject({ value: password }),
    );
  }
}

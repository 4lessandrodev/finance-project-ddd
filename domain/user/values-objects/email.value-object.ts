import { Result, ValueObject } from '../../shared';
import isEmail from 'validator/lib/isEmail';

export interface EmailValueObjectProps {
  value: string;
}

export class EmailValueObject extends ValueObject<EmailValueObjectProps> {
  private constructor(props: EmailValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(email: string): Result<EmailValueObject> {
    const isValidEmail = isEmail(email);
    if (!isValidEmail) {
      return Result.fail<EmailValueObject>('Invalid Email');
    }
    return Result.ok<EmailValueObject>(
      new EmailValueObject({
        value: email,
      }),
    );
  }
}

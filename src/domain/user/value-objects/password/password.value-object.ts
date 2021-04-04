import { ErrorMessages, Result, ValueObject } from '@shared/index';
import { hashSync, compareSync } from 'bcrypt';
const isEncryptPass = /\$2b\$\d\d\$[\s\S]{53}|{.}\b/gm;

export interface PasswordValueObjectProps {
  value: string;
}
export class PasswordValueObject extends ValueObject<PasswordValueObjectProps> {
  private isEncrypted: boolean;
  private constructor(props: PasswordValueObjectProps, isEncrypted: boolean) {
    super(props);
    this.isEncrypted = isEncrypted;
  }

  get value(): string {
    return this.props.value;
  }

  isAlreadyEncrypt(): boolean {
    return isEncryptPass.test(this.props.value);
  }

  async encryptPassWord(): Promise<void> {
    this.props.value = hashSync(this.props.value, 10);
    this.isEncrypted = true;
  }

  async comparePasswords(plainText: string): Promise<boolean> {
    if (this.isEncrypted) {
      return compareSync(plainText, this.props.value);
    }
    return plainText === this.props.value;
  }

  public static create(password: string): Result<PasswordValueObject> {
    const isEncrypt = isEncryptPass.test(password);

    if (!isEncrypt) {
      const isValidPasswordLength =
        password.length >= 3 && password.length <= 20;

      if (!isValidPasswordLength) {
        return Result.fail<PasswordValueObject>(
          ErrorMessages.INVALID_PASSWORD_LENGHT,
        );
      }
    }

    return Result.ok<PasswordValueObject>(
      new PasswordValueObject({ value: password }, isEncrypt),
    );
  }
}

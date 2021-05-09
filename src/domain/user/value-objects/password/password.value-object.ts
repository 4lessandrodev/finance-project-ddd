export const PASSWORD_MIN_LENGTH = 3;
export const PASSWORD_MAX_LENGTH = 20;
import { ErrorMessages } from '@shared/index';
import { hashSync, compareSync } from 'bcrypt';
import { Result, ValueObject } from 'types-ddd';
import { PasswordInterface } from './interfaces/password.interface';
const SALT = 10;
const isEncryptPass = /\$2b\$\d\d\$[\s\S]{53}|{.}\b/gm;

export interface PasswordValueObjectProps {
  value: string;
}
export class PasswordValueObject
  extends ValueObject<PasswordValueObjectProps>
  implements PasswordInterface {
  private isEncrypted: boolean;
  private constructor(props: PasswordValueObjectProps, isEncrypted: boolean) {
    super(props);
    this.isEncrypted = isEncrypted;
  }

  get value(): string {
    return this.props.value;
  }

  get isAlreadyEncrypted(): boolean {
    return this.isEncrypted;
  }

  async encryptPassword(): Promise<void> {
    this.props.value = hashSync(this.props.value, SALT);
    this.isEncrypted = true;
  }
  /**
   *
   * @param plainText password not encrypted as string
   * @returns `true` if match and `false` else not
   */
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
        password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH;

      if (!isValidPasswordLength) {
        return Result.fail<PasswordValueObject>(
          ErrorMessages.INVALID_PASSWORD_LENGTH,
        );
      }
    }

    return Result.ok<PasswordValueObject>(
      new PasswordValueObject({ value: password }, isEncrypt),
    );
  }
}

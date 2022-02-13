export interface PasswordInterface {
  encryptPassword: () => Promise<void>;
  comparePasswords: (plainText: string) => Promise<boolean>;
}

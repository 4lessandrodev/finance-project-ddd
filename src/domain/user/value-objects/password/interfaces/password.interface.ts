export interface PasswordInterface {
  encryptPassWord: () => Promise<void>;
  comparePasswords: (plainText: string) => Promise<boolean>;
}

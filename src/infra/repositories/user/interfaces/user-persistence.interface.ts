import { TermPersistence } from './term-persistence.interface';

export interface UserPersistence {
  email: string;
  password: string;
  budgetBoxIds?: string[];
  totalBalanceAvaliable: number;
  terms: TermPersistence[];
}

import { TermPersistence } from './term-persistence.interface';

export interface UserPersistence {
  id: string;
  email: string;
  password: string;
  budgetBoxIds?: string[];
  totalBalanceAvaliable: number;
  terms: TermPersistence[];
  isDeleted: boolean;
  updatedAt: string;
  createdAt: string;
  deletedAt?: string;
}

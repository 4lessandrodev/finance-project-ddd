import { TermPersistence } from './term-persistence.interface';

/**
 *
 * @var id: `string`
 * @var email: `string`
 * @var password: `string`
 * @var budgetBoxIds?: string`[]`
 * @var totalBalanceAvaliable: `number`
 * @var terms: TermPersistence`[]`
 * @var isDeleted: `boolean`
 * @var updatedAt: `string`
 * @var createdAt: `string`
 * @var deletedAt?: `string`
 */
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

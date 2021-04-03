import { TransactionTypeValueObject } from './transaction-type.value-object';

describe('transaction-type.value-object', () => {
  it('should create a valid transaction-type', () => {
    const result = TransactionTypeValueObject.create('ENTRADA');

    expect(result.isSuccess).toBe(true);
  });
});

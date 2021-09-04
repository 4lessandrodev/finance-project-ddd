import { ErrorMessages } from '@shared/index';
import { DomainId } from 'types-ddd';
import { TransactionCalculationValueObject } from './transaction-calculations.value-object';

describe('transaction-calculations.value-object', () => {
  it('should create a valid calculation', () => {
    const calculation = TransactionCalculationValueObject.create({
      budgetBoxId: DomainId.create('valid_budgetId'),
      value: 200,
    });
    expect(calculation.isSuccess).toBe(true);
    expect(calculation.getResult().calculation.value).toBe(200);
    expect(calculation.getResult().calculation.budgetBoxId.value.toValue()).toBe(
      'valid_budgetId',
    );
  });

  it('should fail if provide a negative number', () => {
    const calculation = TransactionCalculationValueObject.create({
      budgetBoxId: DomainId.create('valid_budgetId'),
      value: -100,
    });
    expect(calculation.isSuccess).toBe(false);
    expect(calculation.error).toBe(
      ErrorMessages.INVALID_TRANSACTION_CALCULATION_VALUE,
    );
  });
});

import { BudgetIdValueObject } from '../../../budget-box/value-objects';
import { ErrorMessages, UniqueEntityID } from '../../../shared';
import { TransactionCalculationValueObject } from './transaction-calculations.value-object';

describe('transaction-calculations.value-object', () => {
  it('should create a valida calculation', () => {
    const calculation = TransactionCalculationValueObject.create({
      budgetBoxId: BudgetIdValueObject.create(
        new UniqueEntityID('valid_budgetId'),
      ).getResult(),
      value: 200,
    });
    expect(calculation.isSuccess).toBe(true);
    expect(calculation.getResult().calculation.value).toBe(200);
    expect(calculation.getResult().calculation.budgetBoxId.id.toValue()).toBe(
      'valid_budgetId',
    );
  });

  it('should fail if provide a negative number', () => {
    const calculation = TransactionCalculationValueObject.create({
      budgetBoxId: BudgetIdValueObject.create(
        new UniqueEntityID('valid_budgetId'),
      ).getResult(),
      value: -100,
    });
    expect(calculation.isSuccess).toBe(false);
    expect(calculation.error).toBe(
      ErrorMessages.INVALID_TRANSACTION_CALCULATION_VALUE,
    );
  });
});

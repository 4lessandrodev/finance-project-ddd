import { BudgetIdValueObject } from '@domain/index';
import { ErrorMessages, Result, ValueObject } from '@shared/index';

export const TRANSACTION_CALCULATION_MIN_VALUE = 0;

interface calcultionProps {
  budgetBoxId: BudgetIdValueObject;
  value: number;
}

export interface TransactionCalculationValueObjectProps {
  calculation: calcultionProps;
}

export class TransactionCalculationValueObject extends ValueObject<TransactionCalculationValueObjectProps> {
  private constructor(props: TransactionCalculationValueObjectProps) {
    super(props);
  }

  get calculation(): calcultionProps {
    return this.props.calculation;
  }

  public static create(
    calculation: calcultionProps,
  ): Result<TransactionCalculationValueObject> {
    const isValidValue = calculation.value >= TRANSACTION_CALCULATION_MIN_VALUE;

    if (!isValidValue) {
      return Result.fail<TransactionCalculationValueObject>(
        ErrorMessages.INVALID_TRANSACTION_CALCULATION_VALUE,
      );
    }

    return Result.ok<TransactionCalculationValueObject>(
      new TransactionCalculationValueObject({ calculation }),
    );
  }
}

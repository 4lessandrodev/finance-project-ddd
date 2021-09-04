import { ErrorMessages } from '@shared/index';
import { Result, ValueObject, DomainId } from 'types-ddd';

export const TRANSACTION_CALCULATION_MIN_VALUE = 0;

interface calculationProps {
  budgetBoxId: DomainId;
  value: number;
}

export interface TransactionCalculationValueObjectProps {
  calculation: calculationProps;
}

export class TransactionCalculationValueObject extends ValueObject<TransactionCalculationValueObjectProps> {
  private constructor(props: TransactionCalculationValueObjectProps) {
    super(props);
  }

  get calculation(): calculationProps {
    return this.props.calculation;
  }

  public static create(
    calculation: calculationProps,
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

import { ErrorMessages, Result, ValueObject } from '@shared/index';

export const BUDGET_PERCENTAGE_MAX_VALUE = 100;
export const BUDGET_PERCENTAGE_MIN_VALUE = 0;
export const DEFAULT_BUDGET_PERCENTAGE_VALUE = 100;

export interface PercentageValueObjectProps {
  value: number;
}

export class PercentageValueObject extends ValueObject<PercentageValueObjectProps> {
  private constructor(props: PercentageValueObjectProps) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(value: number): Result<PercentageValueObject> {
    const isValidRange =
      value >= BUDGET_PERCENTAGE_MIN_VALUE &&
      value <= BUDGET_PERCENTAGE_MAX_VALUE;

    if (!isValidRange) {
      return Result.fail<PercentageValueObject>(
        ErrorMessages.INVALID_PERCENTAGE_VALUE,
      );
    }

    return Result.ok<PercentageValueObject>(
      new PercentageValueObject({ value }),
    );
  }
}

import { ErrorMessages } from '@shared/index';
import { Result, ValueObject } from 'types-ddd';

export const BUDGET_DESCRIPTION_MAX_LENGHT = 30;
export const BUDGET_DESCRIPTION_MIN_LENGHT = 1;

export interface BudgetDescriptionValueObjectProps {
  value: string;
}

export class BudgetDescriptionValueObject extends ValueObject<BudgetDescriptionValueObjectProps> {
  private constructor(props: BudgetDescriptionValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(
    description: string,
  ): Result<BudgetDescriptionValueObject> {
    const isValidLength =
      description.trim().length >= BUDGET_DESCRIPTION_MIN_LENGHT &&
      description.trim().length <= BUDGET_DESCRIPTION_MAX_LENGHT;
    if (!isValidLength) {
      return Result.fail<BudgetDescriptionValueObject>(
        ErrorMessages.INVALID_BUDGET_DESCRIPTION_LENGHT,
      );
    }
    return Result.ok<BudgetDescriptionValueObject>(
      new BudgetDescriptionValueObject({ value: description.toLowerCase() }),
    );
  }
}

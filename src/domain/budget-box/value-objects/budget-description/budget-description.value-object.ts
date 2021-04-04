import { Result, ValueObject, ErrorMessages } from '@shared/index';

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
      description.trim().length >= 1 && description.trim().length <= 30;
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

import { ErrorMessages, Result, ValueObject } from '@shared/index';

export interface ReasonDescriptionValueObjectProps {
  value: string;
}

export class ReasonDescriptionValueObject extends ValueObject<ReasonDescriptionValueObjectProps> {
  private constructor(props: ReasonDescriptionValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(
    description: string,
  ): Result<ReasonDescriptionValueObject> {
    const isValidLength =
      description.trim().length >= 1 && description.trim().length <= 20;
    if (!isValidLength) {
      return Result.fail<ReasonDescriptionValueObject>(
        ErrorMessages.INVALID_REASON_DESCRIPTION_LENGHT,
      );
    }
    return Result.ok<ReasonDescriptionValueObject>(
      new ReasonDescriptionValueObject({ value: description.toLowerCase() }),
    );
  }
}

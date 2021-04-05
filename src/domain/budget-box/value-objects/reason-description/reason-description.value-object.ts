import { ErrorMessages, Result, ValueObject } from '@shared/index';

export const REASON_DESCRIPTION_MAX_LENGHT = 20;
export const REASON_DESCRIPTION_MIN_LENGHT = 1;
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
      description.trim().length >= REASON_DESCRIPTION_MIN_LENGHT &&
      description.trim().length <= REASON_DESCRIPTION_MAX_LENGHT;
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

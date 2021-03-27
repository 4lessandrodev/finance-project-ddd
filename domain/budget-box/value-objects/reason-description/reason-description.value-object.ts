import { Result, ValueObject } from '../../../shared';

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
        'Invalid description lenght min 1 char and max 20 char',
      );
    }
    return Result.ok<ReasonDescriptionValueObject>(
      new ReasonDescriptionValueObject({ value: description.toLowerCase() }),
    );
  }
}

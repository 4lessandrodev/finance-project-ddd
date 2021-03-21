import { Result, ValueObject } from '../../shared';

export interface DescriptionValueObjectProps {
  value: string;
}

export class DescriptionValueObject extends ValueObject<DescriptionValueObjectProps> {
  private constructor(props: DescriptionValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(description: string): Result<DescriptionValueObject> {
    const isValidLength =
      description.trim().length >= 1 && description.trim().length <= 30;
    if (!isValidLength) {
      return Result.fail<DescriptionValueObject>(
        'Invalid description lenght min 1 char and max 30 char',
      );
    }
    return Result.ok<DescriptionValueObject>(
      new DescriptionValueObject({ value: description.toLowerCase() }),
    );
  }
}

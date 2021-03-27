import { Result, ValueObject } from '../../../shared';

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
    const isValidRange = value >= 0 && value <= 100;

    if (!isValidRange) {
      return Result.fail<PercentageValueObject>('Invalid Range Value');
    }

    return Result.ok<PercentageValueObject>(
      new PercentageValueObject({ value }),
    );
  }
}

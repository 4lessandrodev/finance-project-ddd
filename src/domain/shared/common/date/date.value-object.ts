import { isDate } from 'date-fns';
import { Result, ValueObject } from 'types-ddd';

export interface AcceptedAtValueObjectProps {
  value: Date;
}

export class DateValueObject extends ValueObject<AcceptedAtValueObjectProps> {
  private constructor(props: AcceptedAtValueObjectProps) {
    super(props);
  }

  get value(): Date {
    return this.props.value;
  }

  public static create(date: Date): Result<DateValueObject> {
    const isValidDate = isDate(date);

    if (!isValidDate) {
      return Result.fail<DateValueObject>('Invalid date');
    }

    return Result.ok<DateValueObject>(new DateValueObject({ value: date }));
  }
}

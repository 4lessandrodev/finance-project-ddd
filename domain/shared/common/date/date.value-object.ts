import { Result, ValueObject } from '../..';
import { format, isDate } from 'date-fns';

export interface AcceptedAtValueObjectProps {
  value: Date;
}

export class DateValueObject extends ValueObject<AcceptedAtValueObjectProps> {
  private constructor(props: AcceptedAtValueObjectProps) {
    super(props);
  }

  get value(): string {
    return format(this.props.value, 'yyyy-MM-dd hh:mm:ss');
  }

  public static create(date: Date): Result<DateValueObject> {
    const isValidDate = isDate(date);

    if (!isValidDate) {
      return Result.fail<DateValueObject>('Invalid date');
    }

    return Result.ok<DateValueObject>(new DateValueObject({ value: date }));
  }
}

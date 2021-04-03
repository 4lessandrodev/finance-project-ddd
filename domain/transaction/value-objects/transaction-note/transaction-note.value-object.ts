import { Result, ValueObject } from '../../../shared';

export interface TransactionNoteValueObjectProps {
  value: string;
}

export class TransactionNoteValueObject extends ValueObject<TransactionNoteValueObjectProps> {
  private constructor(props: TransactionNoteValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(note: string): Result<TransactionNoteValueObject> {
    const isValidLenght = note.length <= 144;
    if (!isValidLenght) {
      return Result.fail<TransactionNoteValueObject>(
        'Note value should be less than 144 char',
      );
    }

    return Result.ok<TransactionNoteValueObject>(
      new TransactionNoteValueObject({ value: note }),
    );
  }
}

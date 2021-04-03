import { Result, ValueObject } from '../../../shared';

export interface TransactionTypeValueObjectProps {
  value: 'ENTRADA' | 'SAIDA';
}

export class TransactionTypeValueObject extends ValueObject<TransactionTypeValueObjectProps> {
  private constructor(props: TransactionTypeValueObjectProps) {
    super(props);
  }

  get value(): 'ENTRADA' | 'SAIDA' {
    return this.props.value;
  }

  public static create(type: string): Result<TransactionTypeValueObject> {
    return Result.ok<TransactionTypeValueObject>(
      new TransactionTypeValueObject({ value: type as any }),
    );
  }
}

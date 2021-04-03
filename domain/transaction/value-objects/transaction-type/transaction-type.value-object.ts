import { Result, ValueObject } from '../../../shared';

export enum validTransactionTypeEnum {
  'ENTRADA',
  'SAIDA',
}

export type transactionType = keyof typeof validTransactionTypeEnum;
export interface TransactionTypeValueObjectProps {
  value: transactionType;
}

export class TransactionTypeValueObject extends ValueObject<TransactionTypeValueObjectProps> {
  private constructor(props: TransactionTypeValueObjectProps) {
    super(props);
  }

  get value(): transactionType {
    return this.props.value.toUpperCase() as transactionType;
  }

  public static create(
    type: transactionType,
  ): Result<TransactionTypeValueObject> {
    const isValidEnumValue = Object.values(validTransactionTypeEnum).includes(
      type.toUpperCase(),
    );
    if (!isValidEnumValue) {
      return Result.fail<TransactionTypeValueObject>('Invalid option');
    }
    return Result.ok<TransactionTypeValueObject>(
      new TransactionTypeValueObject({ value: type }),
    );
  }
}

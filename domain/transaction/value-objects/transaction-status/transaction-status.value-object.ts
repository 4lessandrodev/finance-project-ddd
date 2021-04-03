import { Result, ValueObject } from '../../../shared';

export enum validTransactionStatusEnum {
  'ENTRADA',
  'SAIDA',
}

export type transactionStatus = keyof typeof validTransactionStatusEnum;
export interface TransactionStatusValueObjectProps {
  value: transactionStatus;
}

export class TransactionStatusValueObject extends ValueObject<TransactionStatusValueObjectProps> {
  private constructor(props: TransactionStatusValueObjectProps) {
    super(props);
  }

  get value(): transactionStatus {
    return this.props.value;
  }

  public static create(
    type: transactionStatus,
  ): Result<TransactionStatusValueObject> {
    const isValidEnumValue = Object.values(validTransactionStatusEnum).includes(
      type.toUpperCase(),
    );
    if (!isValidEnumValue) {
      return Result.fail<TransactionStatusValueObject>('Invalid option');
    }
    return Result.ok<TransactionStatusValueObject>(
      new TransactionStatusValueObject({ value: type }),
    );
  }
}

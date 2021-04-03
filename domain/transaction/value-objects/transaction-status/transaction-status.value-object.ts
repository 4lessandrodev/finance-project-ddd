import { Result, ValueObject } from '../../../shared';

export enum validTransactionStatusEnum {
  'PENDENTE',
  'CONCLUIDO',
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
    return this.props.value.toUpperCase() as transactionStatus;
  }

  public static create(
    status: transactionStatus,
  ): Result<TransactionStatusValueObject> {
    const isValidEnumValue = Object.values(validTransactionStatusEnum).includes(
      status.toUpperCase(),
    );
    if (!isValidEnumValue) {
      return Result.fail<TransactionStatusValueObject>('Invalid option');
    }
    return Result.ok<TransactionStatusValueObject>(
      new TransactionStatusValueObject({ value: status }),
    );
  }
}

import { ErrorMessages } from '@shared/index';
import { ValueObject, Result } from 'types-ddd';

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
      return Result.fail<TransactionStatusValueObject>(
        ErrorMessages.INVALID_ENUM_TRANSACTION_STATUS,
      );
    }
    return Result.ok<TransactionStatusValueObject>(
      new TransactionStatusValueObject({ value: status }),
    );
  }
}

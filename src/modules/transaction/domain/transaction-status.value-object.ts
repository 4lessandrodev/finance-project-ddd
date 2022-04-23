import { ErrorMessages } from '@shared/index';
import { ValueObject, Result } from 'types-ddd';

export enum validTransactionStatusEnum {
	'PENDENTE' = 'PENDENTE',
	'CONCLUIDO' = 'CONCLUIDO',
	'ESTORNADO' = 'ESTORNADO',
}

export type transactionStatus = keyof typeof validTransactionStatusEnum;
export interface TransactionStatusValueObjectProps {
  value: transactionStatus;
}

export class TransactionStatusValueObject extends ValueObject<TransactionStatusValueObjectProps> {
	private constructor (props: TransactionStatusValueObjectProps) {
		super(props);
	}

	get value (): transactionStatus {
		return this.props.value.toUpperCase() as transactionStatus;
	}

	public static isValidValue (value: transactionStatus): boolean {
		return value.toUpperCase() in validTransactionStatusEnum;
	}

	public static create (
		status: transactionStatus,
	): Result<TransactionStatusValueObject> {

		const isValidEnumValue = TransactionStatusValueObject.isValidValue(status);
		
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

export default TransactionStatusValueObject;

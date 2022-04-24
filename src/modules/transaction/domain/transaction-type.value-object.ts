import { ErrorMessages } from '@shared/index';
import { ValueObject, Result } from 'types-ddd';

export enum validTransactionTypeEnum {
	'ENTRADA' = 'ENTRADA',
	'SAIDA' = 'SAIDA',
	'ESTORNO' = 'ESTORNO',
	'TRANSFERENCIA' = 'TRANSFERENCIA'
}

export type transactionType = keyof typeof validTransactionTypeEnum;
export interface TransactionTypeValueObjectProps {
  value: transactionType;
}

export class TransactionTypeValueObject extends ValueObject<TransactionTypeValueObjectProps> {
	private constructor (props: TransactionTypeValueObjectProps) {
		super(props);
	}

	get value (): transactionType {
		return this.props.value.toUpperCase() as transactionType;
	}

	public static isValidValue (value: transactionType): boolean {
		return value.toUpperCase() in validTransactionTypeEnum;
	}

	public static create (
		type: transactionType,
	): Result<TransactionTypeValueObject> {
		
		const isValidEnumValue = TransactionTypeValueObject.isValidValue(type);

		if (!isValidEnumValue) {
			return Result.fail<TransactionTypeValueObject>(
				ErrorMessages.INVALID_ENUM_TRANSACTION_TYPE,
			);
		}
		
		return Result.ok<TransactionTypeValueObject>(
			new TransactionTypeValueObject({ value: type }),
		);
	}
}

export default TransactionTypeValueObject;

import { ErrorMessages } from '@shared/index';
import { ValueObject, Result } from 'types-ddd';

export const TRANSACTION_NOTE_MAX_LENGTH = 144;
export interface TransactionNoteValueObjectProps {
  value: string;
}

export class TransactionNoteValueObject extends ValueObject<TransactionNoteValueObjectProps> {
	private constructor (props: TransactionNoteValueObjectProps) {
		super(props);
	}

	get value (): string {
		return this.props.value;
	}

	public static isValidValue (value: string): boolean {
		return value.length <= TRANSACTION_NOTE_MAX_LENGTH;
	}

	public static create (note: string): Result<TransactionNoteValueObject> {
		
		const isValidLength = TransactionNoteValueObject.isValidValue(note);

		if (!isValidLength) {
			return Result.fail<TransactionNoteValueObject>(
				ErrorMessages.INVALID_TRANSACTION_NOTE_LENGTH,
			);
		}

		return Result.ok<TransactionNoteValueObject>(
			new TransactionNoteValueObject({ value: note }),
		);
	}
}

export default TransactionNoteValueObject;

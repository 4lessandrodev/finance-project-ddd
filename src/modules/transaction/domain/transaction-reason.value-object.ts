import { ErrorMessages } from "@modules/shared";
import { Result, ValueObject } from "types-ddd";

export const TRANSACTION_DESCRIPTION_MAX_LENGTH = 50;
export const TRANSACTION_DESCRIPTION_MIN_LENGTH = 3;

interface Props {
	value: string
}

export class TransactionReasonDescriptionValueObject extends ValueObject<Props>{
	private constructor (props: Props) {
		super(props);
	}

	get value (): string {
		return this.props.value.toLowerCase();
	}

	public static isValidValue (value: string): boolean {
		return value.length <= TRANSACTION_DESCRIPTION_MAX_LENGTH &&
			value.length >= TRANSACTION_DESCRIPTION_MIN_LENGTH;
	}

	public static createValid (value: string): TransactionReasonDescriptionValueObject {
		
		if (value.length < TRANSACTION_DESCRIPTION_MIN_LENGTH) {
			return new TransactionReasonDescriptionValueObject({ value: 'auto import: ' + value });
		}

		if (value.length > TRANSACTION_DESCRIPTION_MAX_LENGTH) {
			return new TransactionReasonDescriptionValueObject({
				value: value.slice(0, TRANSACTION_DESCRIPTION_MAX_LENGTH - 1)
			});
		}

		return new TransactionReasonDescriptionValueObject({ value });
	}
	
	public static create (value: string): Result<TransactionReasonDescriptionValueObject> {
		const isValidValue = this.isValidValue(value);

		if (!isValidValue) {
			return Result.fail(ErrorMessages.INVALID_TRANSACTION_REASON_DESCRIPTION_LENGTH);
		}

		return Result.ok(new TransactionReasonDescriptionValueObject({ value }));
	}
}

export default TransactionReasonDescriptionValueObject;

import { ErrorMessages } from "@modules/shared";
import { Result, ValueObject } from "types-ddd";

export const TRANSACTION_BUDGET_BOX_NAME_MAX_LENGTH = 30;
export const TRANSACTION_BUDGET_BOX_NAME_MIN_LENGTH = 3;

interface Props {
	value: string
}

export class TransactionBudgetBoxNameValueObject extends ValueObject<Props>{
	private constructor (props: Props) {
		super(props);
	}

	get value (): string {
		return this.props.value.toLowerCase();
	}

	public static isValidValue (value: string): boolean {
		return value.length <= TRANSACTION_BUDGET_BOX_NAME_MAX_LENGTH &&
			value.length >= TRANSACTION_BUDGET_BOX_NAME_MIN_LENGTH;
	}
	
	public static create (value: string): Result<TransactionBudgetBoxNameValueObject> {
		const isValidValue = this.isValidValue(value);

		if (!isValidValue) {
			return Result.fail(ErrorMessages.INVALID_BUDGET_DESCRIPTION_LENGTH);
		}

		return Result.ok(new TransactionBudgetBoxNameValueObject({ value }));
	}
}

export default TransactionBudgetBoxNameValueObject;

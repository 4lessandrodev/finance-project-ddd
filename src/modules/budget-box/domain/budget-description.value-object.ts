
import { ErrorMessages } from '@modules/shared';
import { Result, ValueObject } from 'types-ddd';

export const BUDGET_DESCRIPTION_MAX_LENGTH = 30;
export const BUDGET_DESCRIPTION_MIN_LENGTH = 1;

export interface BudgetDescriptionValueObjectProps {
  value: string;
}

export class BudgetDescriptionValueObject extends ValueObject<BudgetDescriptionValueObjectProps> {
	private constructor (props: BudgetDescriptionValueObjectProps) {
		super(props);
	}

	get value (): string {
		return this.props.value;
	}

	static isValidValue (value: string): boolean {
		
		const descriptionLength = value.trim().length;

		const isValid = descriptionLength >= BUDGET_DESCRIPTION_MIN_LENGTH &&
			descriptionLength <= BUDGET_DESCRIPTION_MAX_LENGTH;
		return isValid;
	}

	public static create (
		description: string,
	): Result<BudgetDescriptionValueObject> {
		
		const isValidLength = BudgetDescriptionValueObject.isValidValue(description);
      
		if (!isValidLength) {
			return Result.fail<BudgetDescriptionValueObject>(
				ErrorMessages.INVALID_BUDGET_DESCRIPTION_LENGTH,
			);
		}
		
		return Result.ok<BudgetDescriptionValueObject>(
			new BudgetDescriptionValueObject({ value: description.toLowerCase() }),
		);
	}
}

export default BudgetDescriptionValueObject;

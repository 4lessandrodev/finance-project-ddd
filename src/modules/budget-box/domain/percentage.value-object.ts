import { ErrorMessages } from '@shared/index';
import { ValueObject, Result } from 'types-ddd';

export const BUDGET_PERCENTAGE_MAX_VALUE = 100;
export const BUDGET_PERCENTAGE_MIN_VALUE = 0;
export const DEFAULT_BUDGET_PERCENTAGE_VALUE = 100;

export interface PercentageValueObjectProps {
  value: number;
}

export class PercentageValueObject extends ValueObject<PercentageValueObjectProps> {
	private constructor (props: PercentageValueObjectProps) {
		super(props);
	}

	get value (): number {
		return this.props.value;
	}

	static isValidValue (value: number): boolean {
		const isValidRange =
		value >= BUDGET_PERCENTAGE_MIN_VALUE &&
			value <= BUDGET_PERCENTAGE_MAX_VALUE;
		return isValidRange;
	}

	public static create (value: number): Result<PercentageValueObject> {

		const isValidRange = PercentageValueObject.isValidValue(value);

		if (!isValidRange) {
			return Result.fail<PercentageValueObject>(
				ErrorMessages.INVALID_PERCENTAGE_VALUE,
			);
		}

		return Result.ok<PercentageValueObject>(
			new PercentageValueObject({ value }),
		);
	}
}

export default PercentageValueObject;

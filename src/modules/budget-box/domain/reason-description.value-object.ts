import { ErrorMessages } from '@shared/index';
import { ValueObject, Result } from 'types-ddd';

export const REASON_DESCRIPTION_MAX_LENGTH = 30;
export const REASON_DESCRIPTION_MIN_LENGTH = 1;
export interface ReasonDescriptionValueObjectProps {
  value: string;
}

export class ReasonDescriptionValueObject extends ValueObject<ReasonDescriptionValueObjectProps> {
	private constructor (props: ReasonDescriptionValueObjectProps) {
		super(props);
	}

	get value (): string {
		return this.props.value;
	}

	public static isValidValue (description: string): boolean {
		const descriptionLength = description.trim().length;

		const isValidLength = descriptionLength >= REASON_DESCRIPTION_MIN_LENGTH &&
			descriptionLength <= REASON_DESCRIPTION_MAX_LENGTH;
		
		return isValidLength;
	}

	public static create (description: string): Result<ReasonDescriptionValueObject> {
	
		const isValidLength = ReasonDescriptionValueObject.isValidValue(description);

		if (!isValidLength) {
			return Result.fail<ReasonDescriptionValueObject>(
				ErrorMessages.INVALID_REASON_DESCRIPTION_LENGTH,
			);
		}
		return Result.ok<ReasonDescriptionValueObject>(
			new ReasonDescriptionValueObject({ value: description.toLowerCase() }),
		);
	}
}

export default ReasonDescriptionValueObject;

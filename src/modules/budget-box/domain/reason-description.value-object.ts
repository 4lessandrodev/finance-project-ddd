import { ErrorMessages } from '@shared/index';
import { ValueObject, Result } from 'types-ddd';

export const REASON_DESCRIPTION_MAX_LENGTH = 20;
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

	public static create (description: string): Result<ReasonDescriptionValueObject> {
		const isValidLength =
      description.trim().length >= REASON_DESCRIPTION_MIN_LENGTH &&
      description.trim().length <= REASON_DESCRIPTION_MAX_LENGTH;
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

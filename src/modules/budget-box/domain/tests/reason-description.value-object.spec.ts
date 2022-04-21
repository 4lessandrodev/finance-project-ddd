import { ErrorMessages } from '@shared/index';
import { ReasonDescriptionValueObject } from '../reason-description.value-object';

describe('description.value-object', () => {
	it('should create a valid description value object', () => {
		const description = ReasonDescriptionValueObject.create(
			'valid_description',
		);
		expect(description.isSuccess).toBe(true);
	});

	it('should normalize description to lowercase', () => {
		const description = ReasonDescriptionValueObject.create(
			'VaLiD_DesCriPtiOn',
		);
		expect(description.isSuccess).toBe(true);
		expect(description.getResult().value).toBe('valid_description');
	});

	it('should fail if not provide description', () => {
		const description = ReasonDescriptionValueObject.create(' ');
		expect(description.isFailure).toBe(true);
		expect(description.error).toBe(
			ErrorMessages.INVALID_REASON_DESCRIPTION_LENGTH,
		);
	});

	it('should fail if provide long description (greater than 30 char)', () => {
		const description = ReasonDescriptionValueObject.create(
			'Invalid description length greater than max 30 char',
		);
		expect(description.isFailure).toBe(true);
		expect(description.error).toBe(
			ErrorMessages.INVALID_REASON_DESCRIPTION_LENGTH,
		);
	});
});

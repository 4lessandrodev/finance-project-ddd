import { ErrorMessages } from '@shared/index';
import { PercentageValueObject } from '../percentage.value-object';

describe('percentage.value-object', () => {
	it('should create a valid percentage', () => {
		const percentage = PercentageValueObject.create(70);
		expect(percentage.isSuccess).toBe(true);
		expect(percentage.getResult().value).toBe(70);
	});

	it('should fail if provide a number greatter than 100', () => {
		const percentage = PercentageValueObject.create(170);
		expect(percentage.isSuccess).toBe(false);
		expect(percentage.error).toBe(ErrorMessages.INVALID_PERCENTAGE_VALUE);
	});

	it('should fail if provide a number less than 0', () => {
		const percentage = PercentageValueObject.create(-1);
		expect(percentage.isSuccess).toBe(false);
		expect(percentage.error).toBe(ErrorMessages.INVALID_PERCENTAGE_VALUE);
	});
});

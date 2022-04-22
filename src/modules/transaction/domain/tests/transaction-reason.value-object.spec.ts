import TransactionReasonDescriptionValueObject from "../transaction-reason.value-object";

describe('transaction-reason.value-object', () => {
	it('should create a valid value object', () => {
		const result = TransactionReasonDescriptionValueObject.create('valid Description');

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult().value).toBe('valid description');
	});

	it('should fails if provide an invalid value', () => {

		const invalidMaxValue = 'invalid_value'.repeat(50);
		const invalidMinValue = '';

		const resultMax = TransactionReasonDescriptionValueObject.create(invalidMaxValue);
		const resultMin = TransactionReasonDescriptionValueObject.create(invalidMinValue);

		expect(resultMax.isFailure).toBeTruthy();
		expect(resultMin.isFailure).toBeTruthy();
	});

	it('should always create a valid description', () => {

		const invalidMaxValue = 'invalid_value'.repeat(50);
		const invalidMinValue = '';
		const validValue = 'valid_value';

		const resultMax = TransactionReasonDescriptionValueObject.createValid(invalidMaxValue);
		const resultMin = TransactionReasonDescriptionValueObject.createValid(invalidMinValue);
		const result = TransactionReasonDescriptionValueObject.createValid(validValue);

		expect(resultMax.value).toBe(invalidMaxValue.slice(0, 49));
		expect(resultMin.value).toBe('auto import: ');
		expect(result.value).toBe('valid_value');
	});
});
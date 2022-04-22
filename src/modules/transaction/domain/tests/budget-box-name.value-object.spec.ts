import BudgetBoxNameValueObject from "../budget-box-name.value-object";

describe('budget-box-name.value-object', () => {
	it('should create a valid value object', () => {
		const result = BudgetBoxNameValueObject.create('valid Description');

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult().value).toBe('valid description');
	});

	it('should fails if provide an invalid value', () => {

		const invalidMaxValue = 'invalid_value'.repeat(30);
		const invalidMinValue = '';

		const resultMax = BudgetBoxNameValueObject.create(invalidMaxValue);
		const resultMin = BudgetBoxNameValueObject.create(invalidMinValue);

		expect(resultMax.isFailure).toBeTruthy();
		expect(resultMin.isFailure).toBeTruthy();
	});

});
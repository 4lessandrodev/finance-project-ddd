import { CURRENCY } from '@config/env';
import { ErrorMessages } from '@shared/index';
import { CurrencyValueObject, DomainId } from 'types-ddd';
import { TransactionCalculationValueObject } from '../transaction-calculations.value-object';

describe('transaction-calculations.value-object', () => {


	const getCurrency = (value: number) => CurrencyValueObject.create({
		currency: CURRENCY,
		value
	}).getResult();

	it.only('should create a valid calculation', () => {
		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_budgetId'),
			currency: getCurrency(200),
		});

		expect(calculation.isSuccess).toBe(true);
		expect(calculation.getResult().currency.value).toBe(200);
		expect(calculation.getResult().budgetBoxId.uid).toBe('valid_budgetId');
	});

	it('should fail if provide a negative number', () => {
		const calculation = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create('valid_budgetId'),
			currency:  getCurrency(-100),
		});


		expect(calculation.isSuccess).toBe(false);
		expect(calculation.error).toBe(
			ErrorMessages.INVALID_TRANSACTION_CALCULATION_VALUE,
		);
	});
});

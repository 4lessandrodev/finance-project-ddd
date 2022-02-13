
import { BudgetBoxAggregate } from '../budget-box.aggregate';
import { CurrencyValueObject, DomainId } from 'types-ddd';
import { CURRENCY } from '@config/env';
import { PercentageValueObject } from '../percentage.value-object';
import { BudgetDescriptionValueObject } from '../budget-description.value-object';
import { ReasonDomainEntity } from '../reason.domain-entity';
import { ReasonDescriptionValueObject } from '../reason-description.value-object';

describe('budget-box.aggregate', () => {
	const percentage = PercentageValueObject.create(20).getResult();
	const balanceAvailable = CurrencyValueObject.create({
		currency: CURRENCY,
		value: 0
	}).getResult();

	it('should create a valid budget-box aggregate', () => {

		const budgetBox = BudgetBoxAggregate.create({
			ID: DomainId.create(),
			ownerId: DomainId.create(),
			description: BudgetDescriptionValueObject.create(
				'valid_description',
			).getResult(),
			balanceAvailable,
			isPercentage: true,
			budgetPercentage: percentage,
			reasons: [
				ReasonDomainEntity.create({
					ID: DomainId.create(),
					description: ReasonDescriptionValueObject.create(
						'valid_description',
					).getResult(),
				}).getResult(),
			],
		});
		expect(budgetBox.isSuccess).toBe(true);
		expect(budgetBox.getResult().budgetPercentage.value).toBe(20);
	});

	it('should create a valid budget-box aggregate with 100% if provide not percentage', () => {
		const budgetBox = BudgetBoxAggregate.create({
			ID: DomainId.create(),
			ownerId: DomainId.create(),
			description: BudgetDescriptionValueObject.create(
				'valid_description',
			).getResult(),
			balanceAvailable,
			isPercentage: false,
			budgetPercentage: percentage,
			reasons: [
				ReasonDomainEntity.create({
					ID: DomainId.create(),
					description: ReasonDescriptionValueObject.create(
						'valid_description',
					).getResult(),
				}).getResult(),
			],
		});
		expect(budgetBox.isSuccess).toBe(true);
		expect(budgetBox.getResult().budgetPercentage.value).toBe(100);
	});
});

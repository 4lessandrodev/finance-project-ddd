import { ReasonDomainEntity } from '@domain/budget-box/entities';
import {
	BudgetDescriptionValueObject,
	PercentageValueObject,
	ReasonDescriptionValueObject,
} from '@domain/budget-box/value-objects';
import { BudgetBoxAggregate } from './budget-box.aggregate';
import { DomainId } from 'types-ddd';

describe('budget-box.aggregate', () => {
	const percentage = PercentageValueObject.create(20).getResult();
	it('should create a valid budget-box aggregate', () => {

		const budgetBox = BudgetBoxAggregate.create({
			ID: DomainId.create(),
			ownerId: DomainId.create(),
			description: BudgetDescriptionValueObject.create(
				'valid_description',
			).getResult(),
			balanceAvailable: 0,
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
			balanceAvailable: 0,
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

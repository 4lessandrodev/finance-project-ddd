import { DomainId } from 'types-ddd';
import { BudgetBoxMock } from './mock/budget-box.mock';
import { ReasonMock } from './mock/reason.mock';

describe('budget-box.aggregate', () => {

	const budgetBoxMock = new BudgetBoxMock();
	const reasonMock = new ReasonMock();

	it('should create a budget-box with 100% if it is not percentage', () => {

		const budgetBox = budgetBoxMock.domain({
			budgetPercentage: 20,
			isPercentage: false
		});

		expect(budgetBox.isSuccess).toBe(true);
		expect(budgetBox.getResult().budgetPercentage.value).toBe(100);
	});

	it('should create a valid budget-box aggregate with 100% if provide not percentage', () => {

		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: [reasonMock.model({ id: 'valid_id' })]
		});
		
		expect(budgetBox.getResult().toObject()).toMatchSnapshot();
		expect(budgetBox.isSuccess).toBe(true);
		expect(budgetBox.getResult().budgetPercentage.value).toBe(50);
	});

	it('should remove a reason from a budget box with success', () => {
		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: [reasonMock.model({ id: 'valid_id' })]
		}).getResult();

		const reasonId = DomainId.create('valid_id');

		const result = budgetBox.removeBudgetBoxById(reasonId);

		expect(result).toBeTruthy();
	});

	it('should do not remove a reason from a budget if not found', () => {
		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: [reasonMock.model({ id: 'valid_id' })]
		}).getResult();

		const reasonId = DomainId.create('invalid_id');

		const result = budgetBox.removeBudgetBoxById(reasonId);

		expect(result).toBeFalsy();
	});

	it('should add a new reason with success', () => {
		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: []
		}).getResult();

		const reason = reasonMock.domain({ id: 'valid_id' }).getResult();

		budgetBox.addReason(reason);

		expect(budgetBox.reasons).toHaveLength(1);
	});
});

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
});

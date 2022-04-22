import { DomainId } from 'types-ddd';
import BudgetDescriptionValueObject from '../budget-description.value-object';
import ReasonDescriptionValueObject from '../reason-description.value-object';
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

		const result = budgetBox.removeReasonById(reasonId);

		expect(result).toBeTruthy();
	});

	it('should do not remove a reason from a budget if not found', () => {
		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: [reasonMock.model({ id: 'valid_id' })]
		}).getResult();

		const reasonId = DomainId.create('invalid_id');

		const result = budgetBox.removeReasonById(reasonId);

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

	it('should get null on get reason by id and do not exists', () => {
		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: []
		}).getResult();

		const result = budgetBox.getReasonById(DomainId.create('invalid_id'));

		expect(result).toBeNull();
	});

	it('should get null on get reason by id and do not exists', () => {

		const reason = reasonMock.model({ id: 'valid_id' });

		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: [reason]
		}).getResult();

		const result = budgetBox.getReasonById(DomainId.create('valid_id'));

		expect(result?.toObject()).toEqual(reason);
	});

	it('should update reason description with success', () => {

		const reason = reasonMock.model({ id: 'valid_id', description: 'valid_description' });

		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: [reason]
		}).getResult();

		const ID = DomainId.create('valid_id');
		const description = ReasonDescriptionValueObject.create('updated_description').getResult();
		const result = budgetBox.changeReasonDescription(ID, description);

		expect(result).toBeTruthy();
		expect(budgetBox.getReasonById(ID)?.description.value).toBe('updated_description');
		
	});

	it('should return false if does not update description', () => {

		const budgetBox = budgetBoxMock.domain({
			isPercentage: true,
			budgetPercentage: 50,
			reasons: []
		}).getResult();

		const ID = DomainId.create('valid_id');
		const description = ReasonDescriptionValueObject.create('updated_description').getResult();
		const result = budgetBox.changeReasonDescription(ID, description);

		expect(result).toBeFalsy();
	});

	it('should change name with success', () => {

		const budgetBox = budgetBoxMock.domain({ description: 'old_name' }).getResult();

		const description = BudgetDescriptionValueObject.create('updated_description').getResult();
		budgetBox.changeDescription(description);

		expect(budgetBox.description.value).toBe('updated_description');
	});
});

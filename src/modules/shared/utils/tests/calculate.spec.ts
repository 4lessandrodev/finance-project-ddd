import { CURRENCY } from "@config/env";
import { IBoxes } from "@modules/shared/domain/update-budget-box-balance.domain-service";
import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import { CurrencyValueObject, DomainId } from "types-ddd";
import CalculateValueToUpdate from "../calculate";

describe('calculate', () => {
	
	const currentDate = new Date('2020-01-01 00:00:00');

	const makeBudgetBoxModel = (value: number, index: number): IBudgetBox => ({
		id: 'valid_id_' + index,
		balanceAvailable: {
			currency: CURRENCY,
			value
		},
		budgetPercentage: 10,
		createdAt: currentDate,
		description: 'valid_description',
		isPercentage: true,
		ownerId: 'valid_id',
		reasons: [],
		updatedAt: currentDate
	});

	const makeDto = (value: number, index: number): IBoxes => ({
		budgetBoxId: DomainId.create('valid_id_' + index),
		value: CurrencyValueObject.create({
			value,
			currency: CURRENCY
		}).getResult()
	});

	it('should calculate with success', () => {

		const budgetBoxFromDataBase = [10, 20, 30].map(makeBudgetBoxModel);
		const budgetBoxesDto = [20, 40].map(makeDto);
		const expectedResult = [30,60,30].map(makeBudgetBoxModel);

		const calculator = new CalculateValueToUpdate();

		const result = calculator.calc({
			budgetBoxFromDataBase,
			budgetBoxesDto,
			operationType: 'SUM'
		});
		
		expect(result).toEqual(expectedResult);
	});
});

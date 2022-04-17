import BudgetBoxAggregate from "@modules/budget-box/domain/budget-box.aggregate";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import { IBudgetBox, IMockEntity } from "@shared/index";
import { TMapper } from "types-ddd";
import ReasonToDomainMapper from "../budget-box-reason.mapper";
import BudgetBoxToDomainMapper from "../budget-box.mapper";

describe('budget-box.mapper', () => {


	let mapper: TMapper<IBudgetBox, BudgetBoxAggregate>;
	let mock: IMockEntity<BudgetBoxAggregate, IBudgetBox>;

	beforeAll(() => {
		mapper = new BudgetBoxToDomainMapper(new ReasonToDomainMapper());
		mock = new BudgetBoxMock();
	});

	it('should return a fail if provide an invalid percentage value', () => {
		const invalidPercentage = 110; // 0 - 100

		const model = mock.model({ budgetPercentage: invalidPercentage });

		const result = mapper.map(model);

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(422);
	});

	it('should return a valid aggregate', () => {

		const model = mock.model();
		const aggregate = mock.domain(model);

		const result = mapper.map(model);

		expect(result.isSuccess).toBeTruthy();
		expect(result.statusCodeNumber).toBe(200);
		expect(result.getResult()).toEqual(aggregate.getResult());
	});
});

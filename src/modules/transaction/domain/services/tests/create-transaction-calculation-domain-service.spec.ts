import { IBudgetBox, IBudgetBoxConnection } from "@modules/shared";
import CreateTransactionCalculationDomainService from "../create-transaction-calculation.domain-service";

describe('create-transaction-calculation.domain-service', () => {

	let fakeConnection: IBudgetBoxConnection;

	beforeEach(() => {
		fakeConnection = {
			findBudgetBoxesByUserId: jest.fn()
		};
	});

	it('should calculate percentage for each budget box', async () => {

		const data = [10, 10, 20, 20, 40].map((val) => ({
			id: `valid_id-${val}`,
			isPercentage: true,
			description: `valid_name-${val}`,
			budgetPercentage: val
		}));

		const invalidModel = {
			id: 'invalid_id',
			isPercentage: false,
			description: 'valid_name',
			budgetPercentage: 100
		};

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(
			[...data, invalidModel] as IBudgetBox[]
		);

		const domainService = new CreateTransactionCalculationDomainService(fakeConnection);

		const result = await domainService.execute({
			total: 100,
			userId: 'valid_id'
		});

		const calculation = result.map((calc) => calc.toObject());
		
		const total = result.reduce((total, calculation) => total + calculation.currency.value, 0);
		expect(total).toBe(100);
		expect(calculation).toHaveLength(5);
		expect(calculation).toMatchSnapshot();
	});
});

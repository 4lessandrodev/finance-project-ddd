import { IBudgetBoxConnection } from "@modules/shared";
import budgetBoxConnectionMock from "@modules/shared/domain/tests/mocks/budget-box-connection.mock";
import CanCreateBenefit from "../can-create-benefit.proxy";

describe('can-create-benefit.proxy', () => {

	let service: CanCreateBenefit;
	let connection: IBudgetBoxConnection;

	beforeEach(() => {

		connection = budgetBoxConnectionMock;
		service = new CanCreateBenefit(connection);
	});

	it('should can create a benefit with success', async () => {

		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValueOnce({
			isPercentage: false,
		} as any);

		const result = await service.execute({
			budgetBoxId: 'valid_id',
			userId: 'valid_id'
		});

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult()).toBeTruthy();
	});

	it('should cannot create a benefit if is not percentage', async () => {

		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValueOnce({
			isPercentage: true,
		} as any);

		const result = await service.execute({
			budgetBoxId: 'valid_id',
			userId: 'valid_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('This Budget Box is calculated by Percentage');
	});
	
	it('should cannot create a benefit if budget box does not exists', async () => {
		
		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValueOnce(null);

		const result = await service.execute({
			budgetBoxId: 'valid_id',
			userId: 'valid_id'
		});
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Budget Box Does Not Exists');
	});

	it('should fails if connection throws', async () => {
		
		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const result = await service.execute({
			budgetBoxId: 'valid_id',
			userId: 'valid_id'
		});
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error On CanCreateBenefit Proxy');
	});
});
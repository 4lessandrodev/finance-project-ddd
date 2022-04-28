import { CURRENCY } from "@config/env";
import { IBudgetBoxConnection } from "@modules/shared";
import budgetBoxConnectionMock from "@modules/shared/domain/tests/mocks/budget-box-connection.mock";
import CanCreateExpense from "../can-create-expense.proxy";

describe('can-create-expense.proxy', () => {

	let service: CanCreateExpense;
	let connection: IBudgetBoxConnection;

	beforeEach(() => {

		connection = budgetBoxConnectionMock;
		service = new CanCreateExpense(connection);
	});

	it('should can create a benefit with success', async () => {

		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValueOnce({
			balanceAvailable: {
				value: 100,
				currency: CURRENCY
			}
		} as any);

		const result = await service.execute({
			budgetBoxId: 'valid_id',
			userId: 'valid_id',
			total: 20
		});

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult()).toBeTruthy();
	});

	it('should cannot create a benefit if not enough balance', async () => {

		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValueOnce({
			balanceAvailable: {
				value: 10,
				currency: CURRENCY
			}
		} as any);

		const result = await service.execute({
			budgetBoxId: 'valid_id',
			userId: 'valid_id',
			total: 20
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Insufficient Funds. Available: 10');
	});
	
	it('should cannot create a benefit if budget box does not exists', async () => {
		
		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValueOnce(null);

		const result = await service.execute({
			budgetBoxId: 'valid_id',
			userId: 'valid_id',
			total: 10
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
			userId: 'valid_id',
			total: 10
		});
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error On CanCreateExpense Proxy');
	});
});

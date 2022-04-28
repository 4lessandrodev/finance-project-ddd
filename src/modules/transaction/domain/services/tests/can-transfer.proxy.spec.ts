import { CURRENCY } from "@config/env";
import { IBudgetBoxConnection } from "@modules/shared";
import budgetBoxConnectionMock from "@modules/shared/domain/tests/mocks/budget-box-connection.mock";
import CanTransfer from "../can-transfer.proxy";

describe('can-transfer.proxy', () => {

	let service: CanTransfer;
	let connection: IBudgetBoxConnection;

	beforeEach(() => {

		connection = budgetBoxConnectionMock;
		service = new CanTransfer(connection);
		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockClear();
	});

	it('should can transfer with success', async () => {
		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValue({
			balanceAvailable: {
				value: 100,
				currency: CURRENCY
			}
		} as any);

		const result = await service.execute({
			destinationBoxId: 'valid_id',
			sourceBoxId: 'valid_id',
			total: 70,
			userId: 'valid_id'
		});

		expect(result.isSuccess).toBeTruthy();
	});

	it('should fails if box does not have enough balance', async () => {
		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValue({
			balanceAvailable: {
				value: 100,
				currency: CURRENCY
			}
		} as any);

		const result = await service.execute({
			destinationBoxId: 'valid_id',
			sourceBoxId: 'valid_id',
			total: 101,
			userId: 'valid_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('The Budget Box Does Not Have Enough Balance');
	});

	it('should cannot transfer if some box does not exists', async () => {
		jest.spyOn(connection, 'findBudgetBoxByIdAndUserId').mockResolvedValue(null);

		const result = await service.execute({
			destinationBoxId: 'valid_id',
			sourceBoxId: 'valid_id',
			total: 70,
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
			destinationBoxId: 'valid_id',
			sourceBoxId: 'valid_id',
			total: 70,
			userId: 'valid_id'
		});
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error On CanTransfer Proxy');
	});
});

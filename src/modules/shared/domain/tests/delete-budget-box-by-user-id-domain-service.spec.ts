import IBudgetBoxConnection from "../budget-box-connection.interface";
import DeleteBudgetBoxByUserIdDomainService from "../delete-budget-box-by-user-id.domain-service";
import budgetBoxConnectionMock from "./mocks/budget-box-connection.mock";

describe('delete-budget-box-by-user-id.domain-service', () => {

	let fakeConnection: IBudgetBoxConnection;

	beforeEach(() => {
		fakeConnection = budgetBoxConnectionMock;
	});

	it('should delete budget boxes with success', async () => {

		jest.spyOn(fakeConnection, 'deleteBudgetBoxByUserId').mockResolvedValueOnce(true);

		const service = new DeleteBudgetBoxByUserIdDomainService(fakeConnection);

		const result = await service.execute({ userId: 'valid_id' });

		expect(result.isSuccess).toBeTruthy();
	});

	it('should returns fails if does not delete', async () => {

		jest.spyOn(fakeConnection, 'deleteBudgetBoxByUserId').mockResolvedValueOnce(false);

		const service = new DeleteBudgetBoxByUserIdDomainService(fakeConnection);

		const result = await service.execute({ userId: 'valid_id' });
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Could not delete budget boxes for user');
	});

	it('should returns fails if connection throws', async () => {

		jest.spyOn(fakeConnection, 'deleteBudgetBoxByUserId').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const service = new DeleteBudgetBoxByUserIdDomainService(fakeConnection);

		const result = await service.execute({ userId: 'valid_id' });
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error On Delete Budget Box By UserId Domain Service');
	});
});

import ITransactionConnection from "../transaction-connection.interface";
import DeleteTransactionUserIdDomainService from "../delete-transactions-by-user-id.domain-service";
import transactionConnectionMock from "./mocks/transaction-connection.mock";

describe('delete-transactions-by-user-id.domain-service', () => {

	let fakeConnection: ITransactionConnection;

	beforeEach(() => {
		fakeConnection = transactionConnectionMock;
	});

	it('should delete transactions with success', async () => {

		jest.spyOn(fakeConnection, 'deleteTransactionByUserId').mockResolvedValueOnce(true);

		const service = new DeleteTransactionUserIdDomainService(fakeConnection);

		const result = await service.execute({ userId: 'valid_id' });

		expect(result.isSuccess).toBeTruthy();
	});

	it('should returns fails if does not delete', async () => {

		jest.spyOn(fakeConnection, 'deleteTransactionByUserId').mockResolvedValueOnce(false);

		const service = new DeleteTransactionUserIdDomainService(fakeConnection);

		const result = await service.execute({ userId: 'valid_id' });
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Could not delete transactions for user');
	});

	it('should returns fails if connection throws', async () => {

		jest.spyOn(fakeConnection, 'deleteTransactionByUserId').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const service = new DeleteTransactionUserIdDomainService(fakeConnection);

		const result = await service.execute({ userId: 'valid_id' });
		
		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error On Delete Transactions By UserId Domain Service');
	});
});

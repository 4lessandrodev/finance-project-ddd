import { ITransactionQueryService } from "@modules/transaction/infra/services/queries/transaction-query.interface";
import transactionQueryServiceMock from "@modules/transaction/application/mocks/transaction-query-service.mock";
import { GetTransactionsByUserIdUseCase } from "./get-transactions-by-user-id.use-case";

describe('get-transactions-by-user-id.use-case', () => {

	const fakeQueryService: ITransactionQueryService = transactionQueryServiceMock;

	it('should get transactions with success', async () => {

		jest.spyOn(fakeQueryService, 'getTransactionsByUserId').mockResolvedValueOnce([]);
		const useCase = new GetTransactionsByUserIdUseCase(fakeQueryService);

		const result = await useCase.execute({ userId: 'valid_id' });

		expect(result.getResult()).toEqual([]);
	});

	it('should return fails if query service throws', async () => {

		jest.spyOn(fakeQueryService, 'getTransactionsByUserId').mockImplementationOnce(async () => {
			throw new Error("error");
		});
		const useCase = new GetTransactionsByUserIdUseCase(fakeQueryService);

		const result = await useCase.execute({ userId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
	});
});

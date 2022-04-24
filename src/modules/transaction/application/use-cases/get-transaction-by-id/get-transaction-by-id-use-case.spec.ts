import { ITransactionQueryService } from "@modules/transaction/infra/services/queries/transaction-query.interface";
import transactionQueryServiceMock from "@modules/transaction/application/mocks/transaction-query-service.mock";
import GetTransactionByIdUseCase from "./get-transaction-by-id.use-case";
import TransactionMock from "@modules/transaction/domain/tests/mock/transaction.mock";

describe('get-transaction-by-id.use-case', () => {

	let transactionQueryService: ITransactionQueryService;
	const mock = new TransactionMock();

	beforeEach(() => {
		transactionQueryService = transactionQueryServiceMock;
	});

	it('should get transaction with success', async () => {

		const model = mock.model();

		jest.spyOn(transactionQueryService, 'getTransactionById').mockResolvedValueOnce(model);

		const useCase = new GetTransactionByIdUseCase(transactionQueryServiceMock);

		const result = await useCase.execute({ transactionId: 'valid_id', userId: 'valid_id' });

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult()).toEqual(model);
	});

	it('should return fails if transaction is not found', async () => {

		jest.spyOn(transactionQueryService, 'getTransactionById').mockResolvedValueOnce(null);

		const useCase = new GetTransactionByIdUseCase(transactionQueryServiceMock);

		const result = await useCase.execute({ transactionId: 'valid_id', userId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toEqual('Transaction Not Found');
	});

	it('should return fails if query service throws', async () => {

		jest.spyOn(transactionQueryService, 'getTransactionById').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const useCase = new GetTransactionByIdUseCase(transactionQueryServiceMock);

		const result = await useCase.execute({ transactionId: 'valid_id', userId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toEqual('Internal Server Error On Get Transaction By Id Use Case');
	});
});

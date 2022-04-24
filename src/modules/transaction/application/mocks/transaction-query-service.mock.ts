import { ITransactionQueryService } from "@modules/transaction/infra/services/queries/transaction-query.interface";

export const transactionQueryServiceMock: ITransactionQueryService = {
	getTransactionsByUserId: jest.fn(),
	getTransactionById: jest.fn(),
};

export default transactionQueryServiceMock;

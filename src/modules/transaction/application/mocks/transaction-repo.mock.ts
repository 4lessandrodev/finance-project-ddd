import ITransactionRepository from "@modules/transaction/domain/interfaces/transaction.repository.interface";

export const transactionMockRepo: ITransactionRepository = {
	delete: jest.fn(),
	exists: jest.fn(),
	find: jest.fn(),
	findOne: jest.fn(),
	save: jest.fn(),
};

export default transactionMockRepo;

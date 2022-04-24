import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";

export const budgetBoxMockRepo: IBudgetBoxRepository = {
	delete: jest.fn(),
	exists: jest.fn(),
	find: jest.fn(),
	findOne: jest.fn(),
	save: jest.fn(),
};

export default budgetBoxMockRepo;

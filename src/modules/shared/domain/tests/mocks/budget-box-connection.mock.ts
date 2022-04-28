import { IBudgetBoxConnection } from "../../budget-box-connection.interface";

export const budgetBoxConnectionMock: IBudgetBoxConnection = {
	findBudgetBoxesByUserId: jest.fn(),
	findBudgetBoxByIdAndUserId: jest.fn(),
	getBudgetBoxesByIds: jest.fn(),
	updateBudgetBoxesBalance: jest.fn(),
	deleteBudgetBoxByUserId: jest.fn()
};

export default budgetBoxConnectionMock;

import { IBudgetBoxQueryService } from "@modules/budget-box/infra/services/queries/budget-box-query.interface";

export const budgetBoxQueryServiceMock: IBudgetBoxQueryService = {
	getBudgetBoxByIdAndOwnerId: jest.fn(),
	getBudgetBoxesByOwnerId: jest.fn()
};

export default budgetBoxQueryServiceMock;

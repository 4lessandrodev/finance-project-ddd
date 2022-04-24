import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import { IBudgetBoxQueryService } from "@modules/budget-box/infra/services/queries/budget-box-query.interface";
import budgetBoxQueryServiceMock from "@modules/budget-box/application/mocks/budget-box-query-service.mock";
import { GetBudgetBoxByIdUseCase } from "./get-budget-box-by-id.use-case";

describe('get-budget-box-by-id.use-case', () => {

	const mockBudgetBox = new BudgetBoxMock();

	let fakeQueryService: IBudgetBoxQueryService;

	beforeEach(() => {
		fakeQueryService = budgetBoxQueryServiceMock;
	});

	it('should get a budget box by id', async () => {
		
		const useCase = new GetBudgetBoxByIdUseCase(fakeQueryService);
		const model = mockBudgetBox.model();

		jest.spyOn(fakeQueryService, 'getBudgetBoxByIdAndOwnerId')
			.mockResolvedValueOnce(model);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			ownerId: 'valid_owner_id'
		});

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult()).toEqual(model);
	});

	it('should return fails if not found', async () => {
		
		const useCase = new GetBudgetBoxByIdUseCase(fakeQueryService);

		jest.spyOn(fakeQueryService, 'getBudgetBoxByIdAndOwnerId')
			.mockResolvedValueOnce(null);

		const result = await useCase.execute({
			budgetBoxId: 'invalid_budget_box_id',
			ownerId: 'valid_owner_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(404);
	});

	it('should return fails if repo throws', async () => {
		
		const useCase = new GetBudgetBoxByIdUseCase(fakeQueryService);

		jest.spyOn(fakeQueryService, 'getBudgetBoxByIdAndOwnerId')
			.mockImplementationOnce(async () => {
				throw new Error("error");
			});

		const result = await useCase.execute({
			budgetBoxId: 'invalid_budget_box_id',
			ownerId: 'valid_owner_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(500);
	});
});

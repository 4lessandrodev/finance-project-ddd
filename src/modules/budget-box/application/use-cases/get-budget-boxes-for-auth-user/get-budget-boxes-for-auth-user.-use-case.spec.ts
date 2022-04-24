import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import { IBudgetBoxQueryService } from "@modules/budget-box/infra/services/queries/budget-box-query.interface";
import { GetBudgetBoxesForAuthUserUseCase } from "./get-budget-boxes-for-auth-user.use-case";
import budgetBoxQueryServiceMock from "@modules/budget-box/application/mocks/budget-box-query-service.mock";

describe('get-budget-boxes-for-auth-user', () => {

	let fakeQueryService: IBudgetBoxQueryService;

	beforeEach(() => {
		fakeQueryService = budgetBoxQueryServiceMock;
	});

	it('should get a empty array if none budget box were found', async () => {
		jest.spyOn(fakeQueryService, 'getBudgetBoxesByOwnerId').mockResolvedValueOnce([]);

		const useCase = new GetBudgetBoxesForAuthUserUseCase(fakeQueryService);

		const result = await useCase.execute({ ownerId: 'valid_user_id' });

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult()).toEqual([]);
	});

	it('should get a all budget box for user', async () => {

		const mockData = new BudgetBoxMock();
		const data = ['valid_user_id', 'valid_user_id', 'valid_user_id']
			.map((ownerId) => mockData
				.model({ ownerId }));

		jest.spyOn(fakeQueryService, 'getBudgetBoxesByOwnerId').mockResolvedValueOnce(data);

		const useCase = new GetBudgetBoxesForAuthUserUseCase(fakeQueryService);

		const result = await useCase.execute({ ownerId: 'valid_user_id' });

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult()).toHaveLength(3);
		expect(result.getResult()).toEqual(data);
	});

	it('should returns internal server error if service throws', async () => {
		jest.spyOn(fakeQueryService, 'getBudgetBoxesByOwnerId').mockImplementationOnce(
			async () => {
				throw new Error("error");
			});

		const useCase = new GetBudgetBoxesForAuthUserUseCase(fakeQueryService);

		const result = await useCase.execute({ ownerId: 'valid_user_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toEqual('Internal Server Error on Get Budget Boxes For Auth User UseCase');
		expect(result.statusCodeNumber).toEqual(500);
	});
});

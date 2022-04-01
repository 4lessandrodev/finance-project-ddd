import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import { CreateBudgetBoxUseCase } from "./create-budget-box.use-case";

describe('create-budget-box.use-case', () => {


	const budgetBoxMock = new BudgetBoxMock();
	let budgetRepoMock: IBudgetBoxRepository;

	beforeEach(() => {
		budgetRepoMock = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};
	});

	it('should create a budget box with success', async () => {

		const budgetModelMock = budgetBoxMock.model();

		const useCase = new CreateBudgetBoxUseCase(budgetRepoMock);

		const result = await useCase.execute({
			ownerId: budgetModelMock.ownerId,
			budgetPercentage: budgetModelMock.budgetPercentage,
			description: budgetModelMock.description,
			isPercentage: budgetModelMock.isPercentage
		});

		expect(result.isSuccess).toBeTruthy();
	});

	it('should fails if provide a percentage greater than 100', async () => {
		const budgetModelMock = budgetBoxMock.model();
		const repoSpy = jest.spyOn(budgetRepoMock, 'save');
		const invalidPercentage = 101; // max valid value is 100

		const useCase = new CreateBudgetBoxUseCase(budgetRepoMock);

		const result = await useCase.execute({
			ownerId: budgetModelMock.ownerId,
			budgetPercentage: invalidPercentage,
			description: budgetModelMock.description,
			isPercentage: budgetModelMock.isPercentage
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCode).toBe('UNPROCESSABLE_ENTITY');
		expect(repoSpy).not.toHaveBeenCalled();
		expect(result.error).toBe('Invalid range value to percentage');
	});

	it('should call repository with success', async () => {
		const budgetModelMock = budgetBoxMock.model();
		const repoSpy = jest.spyOn(budgetRepoMock, 'save');

		const useCase = new CreateBudgetBoxUseCase(budgetRepoMock);

		const result = await useCase.execute({
			ownerId: budgetModelMock.ownerId,
			budgetPercentage: budgetModelMock.budgetPercentage,
			description: budgetModelMock.description,
			isPercentage: budgetModelMock.isPercentage
		});

		expect(result.isSuccess).toBeTruthy();
		expect(repoSpy).toHaveBeenCalled();
	});

	it('should return result fail if use case throws', async () => {
		const budgetModelMock = budgetBoxMock.model();

		jest.spyOn(budgetRepoMock, 'save').mockImplementationOnce(async () => {
			throw new Error("internal server error");
		});

		const useCase = new CreateBudgetBoxUseCase(budgetRepoMock);

		const result = await useCase.execute({
			ownerId: budgetModelMock.ownerId,
			budgetPercentage: budgetModelMock.budgetPercentage,
			description: budgetModelMock.description,
			isPercentage: budgetModelMock.isPercentage
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error on Create BudgetBox UseCase');
		expect(result.statusCode).toBe('INTERNAL_SERVER_ERROR');
	});
});

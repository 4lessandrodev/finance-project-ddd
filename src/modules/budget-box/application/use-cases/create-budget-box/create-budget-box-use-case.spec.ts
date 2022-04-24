import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import CreateBudgetBoxDto from "./create-budget-box.dto";
import { CreateBudgetBoxUseCase } from "./create-budget-box.use-case";
import budgetBoxMockRepo from "@modules/budget-box/application/mocks/budget-box-repo.mock";

describe('create-budget-box.use-case', () => {


	const budgetBoxMock = new BudgetBoxMock();
	let budgetRepoMock: IBudgetBoxRepository;

	beforeEach(() => {
		budgetRepoMock = budgetBoxMockRepo;
		jest.spyOn(budgetRepoMock, 'save').mockClear();
	});

	const budgetModelMock = budgetBoxMock.model();

	const dto: CreateBudgetBoxDto = {
		budgetPercentage: budgetModelMock.budgetPercentage,
		ownerId: budgetModelMock.ownerId,
		isPercentage: budgetModelMock.isPercentage,
		description: budgetModelMock.description
	};

	it('should create a budget box with success', async () => {

		const useCase = new CreateBudgetBoxUseCase(budgetRepoMock);

		const result = await useCase.execute(dto);

		expect(result.isSuccess).toBeTruthy();
	});

	it('should fails if provide a percentage greater than 100', async () => {
		
		const repoSpy = jest.spyOn(budgetRepoMock, 'save');
		const invalidPercentage = 101; // max valid value is 100

		const useCase = new CreateBudgetBoxUseCase(budgetRepoMock);

		const result = await useCase.execute({...dto, budgetPercentage: invalidPercentage });

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCode).toBe('UNPROCESSABLE_ENTITY');
		expect(repoSpy).not.toHaveBeenCalled();
		expect(result.error).toBe('Invalid range value to percentage');
	});

	it('should call repository with success', async () => {
		const repoSpy = jest.spyOn(budgetRepoMock, 'save');

		const useCase = new CreateBudgetBoxUseCase(budgetRepoMock);

		const result = await useCase.execute(dto);

		expect(result.isSuccess).toBeTruthy();
		expect(repoSpy).toHaveBeenCalled();
	});

	it('should return result fail if use case throws', async () => {

		jest.spyOn(budgetRepoMock, 'save').mockImplementationOnce(async () => {
			throw new Error("internal server error");
		});

		const useCase = new CreateBudgetBoxUseCase(budgetRepoMock);

		const result = await useCase.execute(dto);

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error on Create BudgetBox UseCase');
		expect(result.statusCode).toBe('INTERNAL_SERVER_ERROR');
	});
});

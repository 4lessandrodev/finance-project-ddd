import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import budgetBoxMockRepo from "@modules/budget-box/application/mocks/budget-box-repo.mock";
import { ChangeBudgetBoxPercentageUseCase } from "./change-budget-box-percentage.use-case";

describe('change-budget-box-percentage.use-case', () => {

	const budgetBoxMock = new BudgetBoxMock();
	let budgetRepoMock: IBudgetBoxRepository;

	beforeEach(() => {
		budgetRepoMock = budgetBoxMockRepo;
	});

	it('should change percentage with success', async () => {

		const budgetBox = budgetBoxMock.domain({ budgetPercentage: 70, isPercentage: true }).getResult();
		jest.spyOn(budgetRepoMock, 'findOne').mockResolvedValueOnce(budgetBox);

		const useCase = new ChangeBudgetBoxPercentageUseCase(budgetRepoMock);

		const result = await useCase.execute({ budgetBoxId: 'valid_id', budgetPercentage: 100, ownerId: 'valid_id' });

		expect(result.isSuccess).toBeTruthy();
		expect(budgetBox.budgetPercentage.value).toBe(100);
	});

	it('should do not change percentage if budget box is not percentage', async () => {

		const budgetBox = budgetBoxMock.domain({ budgetPercentage: 100, isPercentage: false }).getResult();
		jest.spyOn(budgetRepoMock, 'findOne').mockResolvedValueOnce(budgetBox);

		const useCase = new ChangeBudgetBoxPercentageUseCase(budgetRepoMock);

		const result = await useCase.execute({ budgetBoxId: 'valid_id', budgetPercentage: 70, ownerId: 'valid_id' });

		expect(result.isSuccess).toBeTruthy();
		expect(budgetBox.budgetPercentage.value).toBe(100);
	});

	it('should returns fails if budget box does not exists', async () => {

		jest.spyOn(budgetRepoMock, 'findOne').mockResolvedValueOnce(null);

		const useCase = new ChangeBudgetBoxPercentageUseCase(budgetRepoMock);

		const result = await useCase.execute({ budgetBoxId: 'valid_id', budgetPercentage: 100, ownerId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Budget Box Not Found');
	});

	it('should fails if try to apply more than 100 to percentage', async () => {

		const budgetBox = budgetBoxMock.domain({ budgetPercentage: 70, isPercentage: true }).getResult();
		jest.spyOn(budgetRepoMock, 'findOne').mockResolvedValueOnce(budgetBox);

		const useCase = new ChangeBudgetBoxPercentageUseCase(budgetRepoMock);

		const result = await useCase.execute({ budgetBoxId: 'valid_id', budgetPercentage: 101, ownerId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
	});

	it('should returns fails if repository throws', async () => {

		jest.spyOn(budgetRepoMock, 'findOne').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const useCase = new ChangeBudgetBoxPercentageUseCase(budgetRepoMock);

		const result = await useCase.execute({ budgetBoxId: 'valid_id', budgetPercentage: 101, ownerId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error on Change Budget Box Percentage Use Case');
	});
});


import { IBudgetBoxRepository } from '@modules/budget-box/domain/interfaces/budget-box.repository.interface';
import budgetBoxMockRepo from '@modules/budget-box/application/mocks/budget-box-repo.mock';
import DeleteBudgetBoxUseCase from './delete-budget-box.use-case';
import { BudgetBoxMock } from '@modules/budget-box/domain/tests/mock/budget-box.mock';
import { CURRENCY } from '@config/env';

describe('delete-budget-box.use-case', () => {

	let repo: IBudgetBoxRepository;
	const budgetBoxMock = new BudgetBoxMock();

	beforeEach(() => {
		repo = budgetBoxMockRepo;
		jest.spyOn(repo, 'findOne').mockClear();
	});

	it('should execute delete-budget-box use case with success', async () => {

		const aggregate = budgetBoxMock.domain({
			balanceAvailable: {
				currency: CURRENCY,
				value: 0
			}
		}).getResult();

		jest.spyOn(repo, 'findOne').mockResolvedValueOnce(aggregate);

		const useCase = new DeleteBudgetBoxUseCase(repo);
		const useCaseSpy = jest.spyOn(useCase, 'execute');

		const dto = { userId: 'valid_id', budgetBoxId: 'valid_id' };

		const result = await useCase.execute(dto);
		
		expect(aggregate.domainEvents).toHaveLength(1);

		expect(result.isSuccess).toBeTruthy();
		expect(useCaseSpy).toHaveBeenCalledWith(dto);
	});

	it('should fails if budget box does not exists', async () => {

		jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

		const useCase = new DeleteBudgetBoxUseCase(repo);
		const saveSpy = jest.spyOn(repo, 'save');

		const dto = { userId: 'valid_id', budgetBoxId: 'valid_id' };

		const result = await useCase.execute(dto);

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Budget Box Does Not Exists');
		expect(saveSpy).not.toHaveBeenCalled();
	});

	it('should fails if budget box has balance', async () => {

		const aggregate = budgetBoxMock.domain({
			balanceAvailable: {
				currency: CURRENCY,
				value: 1
			}
		}).getResult();

		jest.spyOn(repo, 'findOne').mockResolvedValueOnce(aggregate);

		const useCase = new DeleteBudgetBoxUseCase(repo);
		const saveSpy = jest.spyOn(repo, 'save');

		const dto = { userId: 'valid_id', budgetBoxId: 'valid_id' };

		const result = await useCase.execute(dto);

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('The budget box must have a zero balance');
		expect(saveSpy).not.toHaveBeenCalledWith(dto);
	});

	it('should fails if repository throws', async () => {

		jest.spyOn(repo, 'findOne').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const useCase = new DeleteBudgetBoxUseCase(repo);
		const saveSpy = jest.spyOn(repo, 'save');

		const dto = { userId: 'valid_id', budgetBoxId: 'valid_id' };

		const result = await useCase.execute(dto);

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error on Delete Budget BoxUse Case');
		expect(saveSpy).not.toHaveBeenCalled();
	});
});

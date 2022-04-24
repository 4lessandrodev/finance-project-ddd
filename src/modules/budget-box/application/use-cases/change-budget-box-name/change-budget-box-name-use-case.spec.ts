import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import ChangeBudgetBoxNameUseCase from "./change-budget-box-name.use-case";
import budgetBoxMockRepo from "@modules/budget-box/application/mocks/budget-box-repo.mock";

describe('change-budget-box-name.use-case', () => {

	let fakeRepo: IBudgetBoxRepository;

	beforeEach(() => {
		fakeRepo = budgetBoxMockRepo;
	});

	const mockBudgetBox = new BudgetBoxMock();

	it('should change name with success', async () => {
		const aggregate = mockBudgetBox.domain({ description: 'old_description' }).getResult();

		jest.spyOn(fakeRepo, 'findOne').mockResolvedValueOnce(aggregate);
		const useCase = new ChangeBudgetBoxNameUseCase(fakeRepo);

		const result = await useCase.execute({
			budgetBoxId: 'valid_id',
			description: 'new_name',
			ownerId: 'valid_id'
		});

		expect(result.isSuccess).toBeTruthy();
		expect(aggregate.description.value).toBe('new_name');
	});

	it('should fails if budget box does not exists', async () => {

		jest.spyOn(fakeRepo, 'findOne').mockResolvedValueOnce(null);
		const useCase = new ChangeBudgetBoxNameUseCase(fakeRepo);

		const result = await useCase.execute({
			budgetBoxId: 'valid_id',
			description: 'new_name',
			ownerId: 'valid_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Budget Box Not Found');
	});

	it('should fails if provide an invalid description', async () => {
		const aggregate = mockBudgetBox.domain({ description: 'old_description' }).getResult();

		jest.spyOn(fakeRepo, 'findOne').mockResolvedValueOnce(aggregate);
		const useCase = new ChangeBudgetBoxNameUseCase(fakeRepo);

		const result = await useCase.execute({
			budgetBoxId: 'valid_id',
			description: 'invalid_long_description'.repeat(10),
			ownerId: 'valid_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(422);
	});

	it('should fails if repository throws', async () => {

		jest.spyOn(fakeRepo, 'findOne').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const useCase = new ChangeBudgetBoxNameUseCase(fakeRepo);

		const result = await useCase.execute({
			budgetBoxId: 'valid_id',
			description: 'valid_description',
			ownerId: 'valid_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error on Change Budget Box Name Use Case');
		expect(result.statusCodeNumber).toBe(500);
	});
});

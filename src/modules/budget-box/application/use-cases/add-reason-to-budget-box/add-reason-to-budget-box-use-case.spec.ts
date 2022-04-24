import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import AddReasonToBudgetBoxUseCase from "./add-reason-to-budget-box.use-case";
import budgetBoxMockRepo from "@modules/budget-box/application/mocks/budget-box-repo.mock";

describe('add-reason-to-budget-box.use-case', () => {

	let budgetBoxRepo: IBudgetBoxRepository;
	const budgetBoxMock = new BudgetBoxMock();

	beforeEach(() => {
		budgetBoxRepo = budgetBoxMockRepo;
	});

	it('should add a valid reason to a budget box', async () => {

		const aggregate = budgetBoxMock.domain({ reasons: [] }).getResult();
		jest.spyOn(budgetBoxRepo, 'findOne').mockResolvedValueOnce(aggregate);

		const useCase = new AddReasonToBudgetBoxUseCase(budgetBoxRepo);

		expect(aggregate.reasons).toHaveLength(0);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			reasonDescription: 'valid_description',
			ownerId: 'valid_owner_id'
		});

		expect(result.isSuccess).toBeTruthy();
		expect(aggregate.reasons).toHaveLength(1);
	});

	it('should fails if budget box does not exists', async () => {

		jest.spyOn(budgetBoxRepo, 'findOne').mockResolvedValueOnce(null);

		const useCase = new AddReasonToBudgetBoxUseCase(budgetBoxRepo);

		const result = await useCase.execute({
			budgetBoxId: 'invalid_budget_box_id',
			reasonDescription: 'valid_description',
			ownerId: 'valid_owner_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Budget Box Not Found');
	});

	it('should fails if provide an invalid description', async () => {


		const aggregate = budgetBoxMock.domain({ reasons: [] }).getResult();
		jest.spyOn(budgetBoxRepo, 'findOne').mockResolvedValueOnce(aggregate);

		const useCase = new AddReasonToBudgetBoxUseCase(budgetBoxRepo);

		expect(aggregate.reasons).toHaveLength(0);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			reasonDescription: 'invalid_description'.repeat(5),
			ownerId: 'valid_owner_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(422);
	});

	it('should returns fails repository throws', async () => {


		const aggregate = budgetBoxMock.domain({ reasons: [] }).getResult();
		jest.spyOn(budgetBoxRepo, 'findOne').mockImplementationOnce(async () => {
			throw new Error("error on repository");
		});

		const useCase = new AddReasonToBudgetBoxUseCase(budgetBoxRepo);

		expect(aggregate.reasons).toHaveLength(0);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			reasonDescription: 'valid_description',
			ownerId: 'valid_owner_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(500);
		expect(result.error).toBe('Internal Server Error on Add Reason To Budget Box');
	});
});

import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import { ReasonMock } from "@modules/budget-box/domain/tests/mock/reason.mock";
import { RemoveReasonFromBudgetBoxUseCase } from "./remove-reason-from-budget-box.use-case";
import budgetBoxMockRepo from "@modules/budget-box/application/mocks/budget-box-repo.mock";

describe('remove-reason-from-budget-box-use-case', () => {

	let fakeRepo: IBudgetBoxRepository;

	beforeEach(() => {
		fakeRepo = budgetBoxMockRepo;
	});

	const mockBudgetBox = new BudgetBoxMock();
	const reasonMock = new ReasonMock();

	it('should remove a reason with success', async () => {

		const reason = reasonMock.model({ id: 'valid_reason_id'});
		const budgetBoxMock = mockBudgetBox.domain({ reasons: [reason]}).getResult();

		jest.spyOn(fakeRepo, 'findOne').mockResolvedValueOnce(budgetBoxMock);

		const useCase = new RemoveReasonFromBudgetBoxUseCase(fakeRepo);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			ownerId: 'valid_owner_id',
			reasonId: 'valid_reason_id'
		});

		expect(result.isSuccess).toBeTruthy();
	});

	it('should fails if budgetBox does not exists', async () => {

		jest.spyOn(fakeRepo, 'findOne').mockResolvedValueOnce(null);

		const useCase = new RemoveReasonFromBudgetBoxUseCase(fakeRepo);

		const result = await useCase.execute({
			budgetBoxId: 'invalid_budget_box_id',
			ownerId: 'invalid_owner_id',
			reasonId: 'valid_reason_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Budget Box Not Found');
	});

	it('should fails if reason does not exists on budgetBox', async () => {
		
		const budgetBoxMock = mockBudgetBox.domain({ reasons: [] }).getResult();
		jest.spyOn(fakeRepo, 'findOne').mockResolvedValueOnce(budgetBoxMock);

		const useCase = new RemoveReasonFromBudgetBoxUseCase(fakeRepo);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			ownerId: 'invalid_owner_id',
			reasonId: 'valid_reason_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Reason not found on budget box');
	});

	it('should returns fails if repository throws', async () => {
		
		jest.spyOn(fakeRepo, 'findOne').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const useCase = new RemoveReasonFromBudgetBoxUseCase(fakeRepo);

		const result = await useCase.execute({
			budgetBoxId: 'invalid_budget_box_id',
			ownerId: 'invalid_owner_id',
			reasonId: 'valid_reason_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error on Remove Reason from Budget Box');
	});
});

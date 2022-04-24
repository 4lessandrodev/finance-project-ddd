import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import { ReasonMock } from "@modules/budget-box/domain/tests/mock/reason.mock";
import ChangeReasonDescriptionUseCase from "./change-reason-description.use-case";
import budgetBoxMockRepo from "@modules/budget-box/application/mocks/budget-box-repo.mock";

describe('change-reason-description.use-case', () => {

	let budgetBoxRepo: IBudgetBoxRepository;
	const budgetBoxMock = new BudgetBoxMock();
	const reasonMock = new ReasonMock();

	beforeEach(() => {
		budgetBoxRepo = budgetBoxMockRepo;
	});

	it('should fails if reason does not exists', async () => {

		const aggregate = budgetBoxMock.domain({ reasons: [] }).getResult();
		jest.spyOn(budgetBoxRepo, 'findOne').mockResolvedValueOnce(aggregate);

		const useCase = new ChangeReasonDescriptionUseCase(budgetBoxRepo);

		expect(aggregate.reasons).toHaveLength(0);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			reasonDescription: 'valid_description',
			ownerId: 'valid_owner_id',
			reasonId: 'invalid_reason_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(aggregate.reasons).toHaveLength(0);
	});

	it('should fails if budget box does not exists', async () => {

		jest.spyOn(budgetBoxRepo, 'findOne').mockResolvedValueOnce(null);

		const useCase = new ChangeReasonDescriptionUseCase(budgetBoxRepo);

		const result = await useCase.execute({
			budgetBoxId: 'invalid_budget_box_id',
			reasonDescription: 'valid_description',
			ownerId: 'valid_owner_id',
			reasonId: 'valid_reason_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Budget Box Not Found');
	});

	it('should fails if provide an invalid description', async () => {
		const reason = reasonMock.model({ description: 'valid_description' });
		const aggregate = budgetBoxMock.domain({ reasons: [reason] }).getResult();
		jest.spyOn(budgetBoxRepo, 'findOne').mockResolvedValueOnce(aggregate);

		const useCase = new ChangeReasonDescriptionUseCase(budgetBoxRepo);

		expect(aggregate.reasons).toHaveLength(1);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			reasonDescription: 'invalid_description'.repeat(10),
			ownerId: 'valid_owner_id',
			reasonId: 'valid_reason_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(422);
	});

	it('should returns fails repository throws', async () => {

		const reason = reasonMock.model({ description: 'valid_description' });
		const aggregate = budgetBoxMock.domain({ reasons: [reason] }).getResult();
		jest.spyOn(budgetBoxRepo, 'findOne').mockImplementationOnce(async () => {
			throw new Error("error on repository");
		});

		const useCase = new ChangeReasonDescriptionUseCase(budgetBoxRepo);

		expect(aggregate.reasons).toHaveLength(1);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			reasonDescription: 'valid_description',
			ownerId: 'valid_owner_id',
			reasonId: 'valid_reason_id'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toBe(500);
		expect(result.error).toBe('Internal Server Error on Change Reason Description Use Case');
	});

	it('should update reason description with success', async () => {
		const reason = reasonMock.model({ id: 'valid_reason_id', description: 'valid_description' });
		const aggregate = budgetBoxMock.domain({ reasons: [reason] }).getResult();
		jest.spyOn(budgetBoxRepo, 'findOne').mockResolvedValueOnce(aggregate);

		const useCase = new ChangeReasonDescriptionUseCase(budgetBoxRepo);

		expect(aggregate.reasons).toHaveLength(1);

		const result = await useCase.execute({
			budgetBoxId: 'valid_budget_box_id',
			reasonDescription: 'valid_changed_description',
			ownerId: 'valid_owner_id',
			reasonId: 'valid_reason_id'
		});

		expect(result.isSuccess).toBeTruthy();
		expect(aggregate.reasons[0].description.value).toBe('valid_changed_description');
	});
});

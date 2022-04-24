import { IBudgetBoxConnection } from "@modules/shared";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import CreateBenefitCalculationDomainService from "@modules/transaction/domain/services/create-single-calculation.domain-service";
import budgetBoxConnectionMock from "@modules/shared/domain/tests/mocks/budget-box-connection.mock";

describe('create-single-calculation.domain-service', () => {

	const fakeConnection: IBudgetBoxConnection = budgetBoxConnectionMock;

	it('should create a valid calculation if budget box is not found', async () => {

		jest.spyOn(fakeConnection, 'findBudgetBoxByIdAndUserId').mockResolvedValueOnce(null);
		const domainService = new CreateBenefitCalculationDomainService(fakeConnection);

		const result = await domainService.execute({
			budgetBoxId: 'valid_id',
			total: 100,
			userId: 'valid_id'
		});

		expect(result).toBeInstanceOf(TransactionCalculationValueObject);
		expect(result.budgetBoxName.value).toBe('operational');
		expect(result.currency.value).toBe(100);
	});

	it('should create a valid calculation', async () => {

		jest.spyOn(fakeConnection, 'findBudgetBoxByIdAndUserId').mockResolvedValueOnce({ description: 'valid' } as any);
		const domainService = new CreateBenefitCalculationDomainService(fakeConnection);

		const result = await domainService.execute({
			budgetBoxId: 'valid_id',
			total: 100,
			userId: 'valid_id'
		});

		expect(result).toBeInstanceOf(TransactionCalculationValueObject);
		expect(result.budgetBoxName.value).toBe('valid');
		expect(result.currency.value).toBe(100);
	});
});

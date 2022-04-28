import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import { IBudgetBoxConnection } from "../budget-box-connection.interface";
import CanCreateTransactionDomainService from "../can-create-transaction.domain-service";
import budgetBoxConnectionMock from "./mocks/budget-box-connection.mock";

describe('can-create-transaction.domain-service', () => {

	let fakeConnection: IBudgetBoxConnection;
	const mockBudgetBox = new BudgetBoxMock();

	beforeEach(() => {
		fakeConnection = budgetBoxConnectionMock;
	});

	it('should can create transaction if total allocate is equal to 100%', async () => {

		const data = [20, 30, 20, 30].map((budgetPercentage) => mockBudgetBox
			.model({ budgetPercentage, isPercentage: true })
		);
		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(data);

		const canCreateService = new CanCreateTransactionDomainService(fakeConnection);

		const result = await canCreateService.execute({ userId: 'valid_id' });

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult()).toBeTruthy();
	});

	it('should cannot create transaction if total allocate is not equal to 100%', async () => {

		const data = [20, 30, 20, 20].map((budgetPercentage) => mockBudgetBox
			.model({ budgetPercentage, isPercentage: true })
		);
		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(data);

		const canCreateService = new CanCreateTransactionDomainService(fakeConnection);

		const result = await canCreateService.execute({ userId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('You must allocate 100% on budget boxes. 10% not allocated');
	});

	it('should cannot create transaction if does not exists none percentage box', async () => {

		const data = [20, 30, 20, 20].map((budgetPercentage) => mockBudgetBox
			.model({ budgetPercentage, isPercentage: false })
		);
		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockResolvedValueOnce(data);

		const canCreateService = new CanCreateTransactionDomainService(fakeConnection);

		const result = await canCreateService.execute({ userId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('You must allocate 100% on budget boxes. 100% not allocated');
	});

	it('should returns fails if connection throws', async () => {

		jest.spyOn(fakeConnection, 'findBudgetBoxesByUserId').mockImplementationOnce(async () => {
			throw new Error("error");
		});

		const canCreateService = new CanCreateTransactionDomainService(fakeConnection);

		const result = await canCreateService.execute({ userId: 'valid_id' });

		expect(result.isFailure).toBeTruthy();
	});
});

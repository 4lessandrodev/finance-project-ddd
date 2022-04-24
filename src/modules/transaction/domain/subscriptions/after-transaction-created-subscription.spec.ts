import { IDomainService } from "@modules/shared";
import { UpdateBudgetBoxBalanceDto } from "@modules/shared/domain/update-budget-box-balance.domain-service";
import { Result } from "types-ddd";
import TransactionCreatedEvent from "../event/transaction-created.event";
import TransactionMock from "../tests/mock/transaction.mock";
import AfterTransactionCreated from "./after-transaction-created.subscription";

describe('after-transaction-created.subscription', () => {

	let fakeUpdateBudgetBoxDomainService: IDomainService<UpdateBudgetBoxBalanceDto, Result<void>> = {
		execute: jest.fn()
	};

	beforeEach(() => {
		fakeUpdateBudgetBoxDomainService = {
			execute: jest.fn()
		};
	});

	const transactionMock = new TransactionMock();

	it('should dispatch with success', async () => {

		jest.spyOn(fakeUpdateBudgetBoxDomainService, 'execute').mockResolvedValueOnce(Result.ok(true));
		const serviceSpy = jest.spyOn(fakeUpdateBudgetBoxDomainService, 'execute');

		const transaction = transactionMock.domain(
			{
				id: 'valid_id',
				transactionType: 'ENTRADA',
			}
		).getResult();

		const event = new AfterTransactionCreated(fakeUpdateBudgetBoxDomainService);

		await event.dispatch(new TransactionCreatedEvent(transaction));
		
		expect(serviceSpy).toHaveBeenCalled();
	});
});

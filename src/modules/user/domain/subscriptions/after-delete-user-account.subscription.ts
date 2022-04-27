import DeleteBudgetBoxByUserIdDomainService from "@modules/shared/domain/delete-budget-box-by-user-id.domain-service";
import DeleteTransactionsByUserIdDomainService from "@modules/shared/domain/delete-transactions-by-user-id.domain-service";
import { Inject } from "@nestjs/common";
import { DomainEvents, IHandle, Logger } from "types-ddd";
import UserAccountDeletedEvent from "../events/delete-user-account.event";

export class AfterDeleteUserAccount implements IHandle<UserAccountDeletedEvent>{

	constructor (
		@Inject(DeleteTransactionsByUserIdDomainService)
		private readonly deleteTransactions: DeleteTransactionsByUserIdDomainService,

		@Inject(DeleteBudgetBoxByUserIdDomainService)
		private readonly deleteBoxes: DeleteBudgetBoxByUserIdDomainService
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions (): void {
		DomainEvents.register(
			(event) => this.dispatch(Object.assign(event)),
			UserAccountDeletedEvent.name
		);
	}

	async dispatch (event: UserAccountDeletedEvent): Promise<void> {
		
		const userId = event.user.id.uid;

		const transactionResult = await this.deleteTransactions.execute({ userId });
		const budgetBoxResult = await this.deleteBoxes.execute({ userId });

		const allDataDeleted = transactionResult.isSuccess && budgetBoxResult.isSuccess;

		if (!allDataDeleted) {
			return Logger.info('Some user info not deleted');
		}
		
		return Logger.info('Success to delete user');
	}
}

export default AfterDeleteUserAccount;

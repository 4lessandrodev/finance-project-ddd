import { IDomainService } from "@modules/shared";
import { UpdateBudgetBoxBalanceDto } from "@modules/shared/domain/update-budget-box-balance.domain-service";
import TransactionCreatedEvent from "@modules/transaction/domain/event/transaction-created.event";
import { Inject } from "@nestjs/common";
import { DomainEvents, IHandle, Logger, Result } from "types-ddd";

export class AfterTransactionCreated implements IHandle<TransactionCreatedEvent>{

	constructor (
		@Inject('UpdateBudgetBoxBalanceDomainService')
		private readonly updateBudgetBoxBalanceDomainService: IDomainService<UpdateBudgetBoxBalanceDto, Result<void>>
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions (): void {
		DomainEvents.register(
			(event) => this.dispatch(Object.assign(event)),
			TransactionCreatedEvent.name
		);
	}

	async dispatch (event: TransactionCreatedEvent): Promise<void> {
		
		const transaction = event.transaction;

		const operations = {
			ENTRADA: "SUM",
			SAIDA: "SUBTRACT",
			ESTORNO: "SUM",
			TRANSFERENCIA: "SUBTRACT"
		};

		const budgetBoxes = transaction.transactionCalculations.map((calc) => ({
			budgetBoxId: calc.budgetBoxId,
			value: calc.currency
		}));

		const operationType = operations[transaction.transactionType.value] as "SUBTRACT" | "SUM";

		const data: UpdateBudgetBoxBalanceDto = { operationType, budgetBoxes };

		if (!operationType) {

			return Logger.error('Invalid operationType');
		
		}

		const result = await this.updateBudgetBoxBalanceDomainService.execute(data);
		return Logger.info(`Success to update box: ${result.isSuccess}`);

	}
}

export default AfterTransactionCreated;

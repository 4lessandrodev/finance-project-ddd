import { IDomainService } from "@modules/shared";
import {
	IBoxes, OperationType, UpdateBudgetBoxBalanceDto
} from "@modules/shared/domain/update-budget-box-balance.domain-service";
import TransactionCreatedEvent from "@modules/transaction/domain/event/transaction-created.event";
import { Inject } from "@nestjs/common";
import { DomainEvents, IHandle, Logger, Result } from "types-ddd";
import { transactionType } from "@modules/transaction/domain/transaction-type.value-object";
type Operations = { [k in transactionType]: OperationType };

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

		const operations: Operations = {
			ENTRADA: "SUM",
			SAIDA: "SUBTRACT",
			ESTORNO: "NONE",
			TRANSFERENCIA: "NONE"
		};

		const budgetBoxes: IBoxes[] = transaction.transactionCalculations.map((calc): IBoxes => ({
			budgetBoxId: calc.budgetBoxId,
			value: calc.currency
		}));

		const operationType = operations[transaction.transactionType.value];

		const data: UpdateBudgetBoxBalanceDto = { operationType, budgetBoxes };

		const result = await this.updateBudgetBoxBalanceDomainService.execute(data);
		return Logger.info(`Success to update box: ${result.isSuccess}`);
	}
}

export default AfterTransactionCreated;

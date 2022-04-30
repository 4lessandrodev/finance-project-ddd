import { DomainEvents, IHandle, Logger } from "types-ddd";
import BudgetBoxDeletedEvent from "../events/budget-box-deleted.event";

export class AfterBudgetBoxDeleted implements IHandle<BudgetBoxDeletedEvent>{
	constructor () {
		this.setupSubscriptions();	
	}

	setupSubscriptions (): void {
		DomainEvents.register(
			(event) => this.dispatch(Object.assign(event)),
			BudgetBoxDeletedEvent.name
		);
	}

	async dispatch (event: BudgetBoxDeletedEvent): Promise<void> {
		Logger.info(`budget box deleted: ${event.budgetBox.id.uid}`);
	}

}

export default AfterBudgetBoxDeleted;

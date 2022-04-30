import { IDomainEvent, UniqueEntityID } from "types-ddd";
import BudgetBoxAggregate from "../budget-box.aggregate";

export class BudgetBoxDeletedEvent implements IDomainEvent {
	public dateTimeOccurred: Date;
	public budgetBox: BudgetBoxAggregate;
	
	constructor (budgetBox: BudgetBoxAggregate) {
		this.budgetBox = budgetBox;
		this.dateTimeOccurred = new Date();
	}

	getAggregateId (): UniqueEntityID {
		return this.budgetBox.id.value;
	}

}

export default BudgetBoxDeletedEvent;

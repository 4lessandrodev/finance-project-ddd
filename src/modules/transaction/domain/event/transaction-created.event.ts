import { IDomainEvent, UniqueEntityID } from "types-ddd";
import TransactionAggregate from "@modules/transaction/domain/transaction.aggregate";

export class TransactionCreatedEvent implements IDomainEvent {
	public dateTimeOccurred: Date;
	public transaction: TransactionAggregate;
	
	constructor (transaction: TransactionAggregate) {
		this.transaction = transaction;
		this.dateTimeOccurred = new Date();
	}

	getAggregateId (): UniqueEntityID {
		return this.transaction.id.value;
	}

}

export default TransactionCreatedEvent;

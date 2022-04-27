import { IDomainEvent, UniqueEntityID } from "types-ddd";
import UserAggregate from "@modules/user/domain/user.aggregate";

export class UserAccountDeletedEvent implements IDomainEvent {
	public dateTimeOccurred: Date;
	public user: UserAggregate;
	
	constructor (user: UserAggregate) {
		this.user = user;
		this.dateTimeOccurred = new Date();
	}

	getAggregateId (): UniqueEntityID {
		return this.user.id.value;
	}

}

export default UserAccountDeletedEvent;

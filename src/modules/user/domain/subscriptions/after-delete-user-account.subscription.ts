import { DomainEvents, IHandle, Logger } from "types-ddd";
import UserAccountDeletedEvent from "../events/delete-user-account.event";

export class AfterDeleteUserAccount implements IHandle<UserAccountDeletedEvent>{

	constructor (
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
		
		// calls delete all transactions belongs to user: REGISTER DOMAIN EVENT
		// calls delete all budget box belongs to user: REGISTER DOMAIN EVENT
		return Logger.info(`Success to delete user: ${event.user.email.value}`);
	}
}

export default AfterDeleteUserAccount;

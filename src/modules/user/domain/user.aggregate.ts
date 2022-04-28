import { TermValueObject } from './term.value-object';
import {
	AggregateRoot,
	BaseDomainEntity,
	EmailValueObject,
	PasswordValueObject,
	Result
} from 'types-ddd';
import UserAccountDeletedEvent from './events/delete-user-account.event';

export interface UserAggregateProps extends BaseDomainEntity {
	email: EmailValueObject;
	password: PasswordValueObject;
	terms: TermValueObject[];
}

/**
 * @var email: `EmailValueObject`
 * @var password: `PasswordValueObject`
 * @var terms: `TermValueObject[]`
 */
export class UserAggregate extends AggregateRoot<UserAggregateProps> {
	private constructor (props: UserAggregateProps) {
		super(props, UserAggregate.name);
	}

	get email (): EmailValueObject {
		return this.props.email;
	}

	get password (): PasswordValueObject {
		return this.props.password;
	}

	get terms (): TermValueObject[] {
		return this.props.terms;
	}

	get deletedAt (): Date | undefined {
		return this.props.deletedAt;
	}

	deleteAccount (): void {
		this.props.isDeleted = true;
		this.props.deletedAt = new Date();
		this.addDomainEvent(new UserAccountDeletedEvent(this));
	}

	public static create (
		props: UserAggregateProps
	): Result<UserAggregate> {
		return Result.ok<UserAggregate>(new UserAggregate(props));
	}
}

export default UserAggregate;

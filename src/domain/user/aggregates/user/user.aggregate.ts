import {
	EmailValueObject,
	PasswordValueObject,
	TermValueObject,
} from '@domain/index';
import {
	AggregateRoot,
	BaseDomainEntity,
	Result
} from 'types-ddd';

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
	private constructor(props: UserAggregateProps) {
		super(props, UserAggregate.name);
	}

	get email(): EmailValueObject {
		return this.props.email;
	}

	get password(): PasswordValueObject {
		return this.props.password;
	}

	get terms(): TermValueObject[] {
		return this.props.terms;
	}

	get deletedAt(): Date | undefined {
		return this.props.deletedAt;
	}

	public static create(
		props: UserAggregateProps
	): Result<UserAggregate> {
		return Result.ok<UserAggregate>(new UserAggregate(props));
	}
}

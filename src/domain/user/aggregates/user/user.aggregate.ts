import {
  AggregateRoot,
  BaseDomainEntity,
  Result,
  UniqueEntityID,
} from '@shared/index';
import {
  EmailValueObject,
  PasswordValueObject,
  TermValueObject,
  BudgetIdValueObject,
} from '@domain/index';

export interface UserAggregateProps extends BaseDomainEntity {
  email: EmailValueObject;
  password: PasswordValueObject;
  budgetBoxIds?: BudgetIdValueObject[];
  totalBalanceAvaliable: number;
  terms: TermValueObject[];
}

/**
 * @var email: `EmailValueObject`
 * @var password: `PasswordValueObject`
 * @var budgetBoxIds?: `BudgetIdValueObject[]`
 * @var totalBalanceAvaliable: `number`
 * @var terms: `TermValueObject[]`
 */
export class UserAggregate extends AggregateRoot<UserAggregateProps> {
  private constructor(props: UserAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get email(): EmailValueObject {
    return this.props.email;
  }

  get password(): PasswordValueObject {
    return this.props.password;
  }

  get budgetBoxIds(): BudgetIdValueObject[] {
    return this.props.budgetBoxIds ?? [];
  }

  get totalBalanceAvaliable(): number {
    return this.props.totalBalanceAvaliable;
  }

  get terms(): TermValueObject[] {
    return this.props.terms;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  public static create(
    props: UserAggregateProps,
    id?: UniqueEntityID,
  ): Result<UserAggregate> {
    return Result.ok<UserAggregate>(new UserAggregate(props, id));
  }
}

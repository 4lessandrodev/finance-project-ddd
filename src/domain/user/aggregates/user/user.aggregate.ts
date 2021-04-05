import { AggregateRoot, Result, UniqueEntityID } from '@shared/index';
import {
  EmailValueObject,
  PasswordValueObject,
  TermValueObject,
  BudgetIdValueObject,
} from '@domain/index';

export interface UserAggregateProps {
  email: EmailValueObject;
  password: PasswordValueObject;
  budgetBoxIds?: BudgetIdValueObject[];
  totalBalanceAvaliable: number;
  terms: TermValueObject[];
}

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

  public static create(
    props: UserAggregateProps,
    id?: UniqueEntityID,
  ): Result<UserAggregate> {
    return Result.ok<UserAggregate>(new UserAggregate(props, id));
  }
}

import { AggregateRoot, Result, UniqueEntityID } from '../../../shared';
import { EmailValueObject } from '../../value-objects/email/email.value-object';
import { PasswordValueObject } from '../../value-objects/password/password.value-object';
import { TermValueObject } from '../../value-objects/term/term.value-object';

export interface UserAggregateProps {
  email: EmailValueObject;
  password: PasswordValueObject;
  budgetBoxIds?: string[];
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

  get budgetBoxIds(): string[] {
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

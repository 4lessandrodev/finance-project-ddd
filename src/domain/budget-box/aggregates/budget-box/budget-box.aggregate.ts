import { AggregateRoot, Result, UniqueEntityID } from '@shared/index';
import {
  BudgetDescriptionValueObject,
  DEFAULT_BUDGET_PERCENTAGE_VALUE,
  BUDGET_PERCENTAGE_MAX_VALUE,
  PercentageValueObject,
  UserIdValueObject,
  ReasonDomainEntity,
} from '@domain/index';

export interface BudgetAggregateProps {
  ownerId: UserIdValueObject;
  description: BudgetDescriptionValueObject;
  balanceAvaliable: number;
  isPercentual: boolean;
  budgetPercentage: PercentageValueObject;
  reasons: ReasonDomainEntity[];
}
export class BudgetBoxAggregate extends AggregateRoot<BudgetAggregateProps> {
  private constructor(props: BudgetAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get ownerId(): UserIdValueObject {
    return this.props.ownerId;
  }

  get description(): BudgetDescriptionValueObject {
    return this.props.description;
  }

  get balanceAvaliable(): number {
    return this.props.balanceAvaliable;
  }

  get isPercentual(): boolean {
    return this.props.isPercentual;
  }

  get budgetPercentage(): PercentageValueObject {
    return this.props.budgetPercentage;
  }

  get reasons(): ReasonDomainEntity[] {
    return this.props.reasons;
  }

  public static create(
    props: BudgetAggregateProps,
    id?: UniqueEntityID,
  ): Result<BudgetBoxAggregate> {
    if (
      !props.isPercentual &&
      props.budgetPercentage.value !== BUDGET_PERCENTAGE_MAX_VALUE
    ) {
      props.budgetPercentage = PercentageValueObject.create(
        DEFAULT_BUDGET_PERCENTAGE_VALUE,
      ).getResult();
    }

    return Result.ok<BudgetBoxAggregate>(new BudgetBoxAggregate(props, id));
  }
}

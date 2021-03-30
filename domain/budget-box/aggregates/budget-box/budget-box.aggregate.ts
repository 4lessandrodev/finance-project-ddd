export interface BudgetAggregateProps {
  ownerId: UserIdValueObject;
  description: BudgetDescriptionValueObject;
  balanceAvaliable: number;
  isPercentual: boolean;
  budgetPercentage: PercentageValueObject;
  reasons: ReasonDomainEntity[];
}

import { AggregateRoot, Result, UniqueEntityID } from '../../../shared';
import { UserIdValueObject } from '../../../user/value-objects';
import { ReasonDomainEntity } from '../../entities';
import {
  BudgetDescriptionValueObject,
  PercentageValueObject,
} from '../../value-objects';

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
    if (!props.isPercentual && props.budgetPercentage.value !== 100) {
      props.budgetPercentage = PercentageValueObject.create(100).getResult();
    }

    return Result.ok<BudgetBoxAggregate>(new BudgetBoxAggregate(props, id));
  }
}

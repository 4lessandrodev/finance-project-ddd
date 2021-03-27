import { UserIdValueObject } from '../../../user/value-objects';
import { ReasonDomainEntity } from '../../entities';
import {
  BudgetDescriptionValueObject,
  PercentageValueObject,
  ReasonDescriptionValueObject,
} from '../../value-objects';
import { BudgetBoxAggregate } from './budget-box.aggregate';

describe('budget-box.aggregate', () => {
  it('should create a valid budget-box aggregate', () => {
    const budgetBox = BudgetBoxAggregate.create({
      ownerId: UserIdValueObject.create().getResult(),
      description: BudgetDescriptionValueObject.create(
        'valid_description',
      ).getResult(),
      balanceAvaliable: 0,
      isPercentual: true,
      budgetPercentage: PercentageValueObject.create(20).getResult(),
      reasons: [
        ReasonDomainEntity.create({
          description: ReasonDescriptionValueObject.create(
            'valid_description',
          ).getResult(),
        }).getResult(),
      ],
    });
    expect(budgetBox.isSuccess).toBe(true);
    expect(budgetBox.getResult().budgetPercentage.value).toBe(20);
  });

  it('should create a valid budget-box aggregate with 100% if provide not percentual', () => {
    const budgetBox = BudgetBoxAggregate.create({
      ownerId: UserIdValueObject.create().getResult(),
      description: BudgetDescriptionValueObject.create(
        'valid_description',
      ).getResult(),
      balanceAvaliable: 0,
      isPercentual: false,
      budgetPercentage: PercentageValueObject.create(20).getResult(),
      reasons: [
        ReasonDomainEntity.create({
          description: ReasonDescriptionValueObject.create(
            'valid_description',
          ).getResult(),
        }).getResult(),
      ],
    });
    expect(budgetBox.isSuccess).toBe(true);
    expect(budgetBox.getResult().budgetPercentage.value).toBe(100);
  });
});

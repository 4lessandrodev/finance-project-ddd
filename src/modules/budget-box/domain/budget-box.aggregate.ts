import { AggregateRoot, BaseDomainEntity, CurrencyValueObject, DomainId, Result } from 'types-ddd';
import { BudgetDescriptionValueObject } from './budget-description.value-object';
import { ReasonDomainEntity } from './reason.domain-entity';
import {
	BUDGET_PERCENTAGE_MAX_VALUE,
	DEFAULT_BUDGET_PERCENTAGE_VALUE,
	PercentageValueObject
} from './percentage.value-object';


export interface BudgetAggregateProps extends BaseDomainEntity {
	ownerId: DomainId;
	description: BudgetDescriptionValueObject;
	balanceAvailable: CurrencyValueObject;
	isPercentage: boolean;
	budgetPercentage: PercentageValueObject;
	reasons: ReasonDomainEntity[];
}
/**
	@var ownerId: `UserIdValueObject`
	@var description: `BudgetDescriptionValueObject`
	@var balanceAvailable: `CurrencyValueObject`
	@var isPercentage: `boolean`
	@var budgetPercentage: `PercentageValueObject`
	@var reasons: `ReasonDomainEntity[]`
 */
export class BudgetBoxAggregate extends AggregateRoot<BudgetAggregateProps> {
	private constructor (props: BudgetAggregateProps) {
		super(props, BudgetBoxAggregate.name);
	}

	get ownerId (): DomainId {
		return this.props.ownerId;
	}

	get description (): BudgetDescriptionValueObject {
		return this.props.description;
	}

	get balanceAvailable (): number {
		return this.props.balanceAvailable.value;
	}

	get isPercentage (): boolean {
		return this.props.isPercentage;
	}

	get budgetPercentage (): PercentageValueObject {
		return this.props.budgetPercentage;
	}

	get reasons (): ReasonDomainEntity[] {
		return this.props.reasons;
	}

	addReason (reason: ReasonDomainEntity): void {
		this.props.reasons.push(reason);
	}

	public static create (
		props: BudgetAggregateProps
	): Result<BudgetBoxAggregate> {

		if (
			!props.isPercentage &&
			props.budgetPercentage.value !== BUDGET_PERCENTAGE_MAX_VALUE
		) {
			props.budgetPercentage = PercentageValueObject.create(
				DEFAULT_BUDGET_PERCENTAGE_VALUE,
			).getResult();
		}

		return Result.ok<BudgetBoxAggregate>(new BudgetBoxAggregate(props));
	}
}

export default BudgetBoxAggregate;

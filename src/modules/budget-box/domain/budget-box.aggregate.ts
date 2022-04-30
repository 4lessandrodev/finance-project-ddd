import { AggregateRoot, BaseDomainEntity, CurrencyValueObject, DomainId, Result } from 'types-ddd';
import { BudgetDescriptionValueObject } from './budget-description.value-object';
import { ReasonDomainEntity } from './reason.domain-entity';
import {
	BUDGET_PERCENTAGE_MAX_VALUE,
	DEFAULT_BUDGET_PERCENTAGE_VALUE,
	PercentageValueObject
} from './percentage.value-object';
import ReasonDescriptionValueObject from './reason-description.value-object';
import BudgetBoxDeletedEvent from './events/budget-box-deleted.event';

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

	get balanceAvailable (): CurrencyValueObject {
		return this.props.balanceAvailable;
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

	changePercentage (percentage: PercentageValueObject): void {
		if (!this.isPercentage) return;
		this.props.budgetPercentage = percentage;
	}

	addReason (reason: ReasonDomainEntity): void {
		this.props.reasons.push(reason);
	}

	getReasonById (reasonId: DomainId): ReasonDomainEntity | null {
		const reasonOrUndefined = this.props
			.reasons
			.find((reason) => reason
				.id.equals(reasonId));
		
		if (!reasonOrUndefined) {
			return null;
		}

		return reasonOrUndefined;
	}

	changeDescription (description: BudgetDescriptionValueObject): void {
		this.props.description = description;
	}

	changeReasonDescription (reasonId: DomainId, description: ReasonDescriptionValueObject): boolean {
		const updated = true;
		const reasonOrNull = this.getReasonById(reasonId);

		if (!reasonOrNull) {
			return !updated;
		}

		const reason = reasonOrNull.clone({
			idStrategy: 'uuid', isNew: false, props: {
				ID: reasonId,
				description,
				createdAt: reasonOrNull.createdAt
			}
		}).getResult();
		
		this.removeReasonById(reasonId);
		this.addReason(reason);
		return updated;
	}

	removeReasonById (reasonId: DomainId): boolean {
		const reasonIndex = this.props
			.reasons
			.findIndex((reason) => reason
				.id.equals(reasonId));
		
		const exists = reasonIndex !== -1;
		if (exists) {
			this.props.reasons.splice(reasonIndex, 1);	
		}

		return exists;
	}

	delete (): void {
		this.props.deletedAt = new Date();
		this.props.isDeleted = true;
		this.addDomainEvent(new BudgetBoxDeletedEvent(this));
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

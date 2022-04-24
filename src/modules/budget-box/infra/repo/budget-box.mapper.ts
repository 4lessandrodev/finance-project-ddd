import { CURRENCY } from "@config/env";
import BudgetBoxAggregate from "@modules/budget-box/domain/budget-box.aggregate";
import BudgetDescriptionValueObject from "@modules/budget-box/domain/budget-description.value-object";
import PercentageValueObject from "@modules/budget-box/domain/percentage.value-object";
import ReasonDomainEntity from "@modules/budget-box/domain/reason.domain-entity";
import { IBudgetBox, IReason } from "@shared/index";
import { Inject } from "@nestjs/common";
import { ChangesObserver, CurrencyValueObject, DomainId, Result, TMapper } from "types-ddd";
import ReasonToDomainMapper from "./budget-box-reason.mapper";

export class BudgetBoxToDomainMapper implements TMapper<IBudgetBox, BudgetBoxAggregate>{

	constructor (
		@Inject(ReasonToDomainMapper)
		private readonly reasonMapper: TMapper<IReason, ReasonDomainEntity>
	){}

	map (target: IBudgetBox): Result<BudgetBoxAggregate, string> {
		

		const balanceAvailableOrError = CurrencyValueObject.create({
			currency: CURRENCY,
			value: target.balanceAvailable.value
		});

		const budgetDescriptionOrError = BudgetDescriptionValueObject.create(target.description);

		const budgetPercentageOrError = PercentageValueObject.create(target.budgetPercentage);

		const reasonsOrError = target.reasons.map(
			(reason) => this.reasonMapper.map(reason)
		);

		const observer = ChangesObserver.init<unknown>([
			balanceAvailableOrError,
			budgetDescriptionOrError,
			budgetPercentageOrError,
			...reasonsOrError
		]);

		const result = observer.getResult();

		if (result.isFailure) {
			const message = result.errorValue();
			return Result.fail(message, 'UNPROCESSABLE_ENTITY');
		}

		return BudgetBoxAggregate.create({
			ID: DomainId.create(target.id),
			balanceAvailable: balanceAvailableOrError.getResult(),
			description: budgetDescriptionOrError.getResult(),
			budgetPercentage: budgetPercentageOrError.getResult(),
			reasons: reasonsOrError.map((reason) => reason.getResult()),
			isPercentage: target.isPercentage,
			ownerId: DomainId.create(target.ownerId),
			createdAt: target.createdAt,
			updatedAt: target.updatedAt,
			isDeleted: target.isDeleted,
			deletedAt: target.deletedAt
		});
	};
}

export default BudgetBoxToDomainMapper;

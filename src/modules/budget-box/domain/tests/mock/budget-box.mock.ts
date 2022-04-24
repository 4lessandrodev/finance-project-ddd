import { BudgetDescriptionValueObject } from "@modules/budget-box/domain/budget-description.value-object";
import { DEFAULT_BUDGET_PERCENTAGE_VALUE } from "@modules/budget-box/domain/percentage.value-object";
import { BudgetBoxAggregate } from "@modules/budget-box/domain/budget-box.aggregate";
import { IBudgetBox, IMockEntity } from "@shared/index";
import { PercentageValueObject } from '@modules/budget-box/domain/percentage.value-object';
import { ChangesObserver, CurrencyValueObject, DomainId, Result } from "types-ddd";
import { ReasonMock } from "./reason.mock";
import { CURRENCY } from "@config/env";

export class BudgetBoxMock implements IMockEntity<BudgetBoxAggregate, IBudgetBox>{
	private readonly reasonMock: ReasonMock;
	constructor () {
		this.reasonMock = new ReasonMock();
	}

	domain (props?: Partial<IBudgetBox>): Result<BudgetBoxAggregate, string> {
		
		const ID = DomainId.create(props?.id ?? 'valid_id');

		const ownerId = DomainId.create(props?.ownerId ?? 'valid_owner_id');

		const balanceAvailable = CurrencyValueObject.create({
			value: props?.balanceAvailable?.value ?? 1000,
			currency: CURRENCY
		});

		const budgetPercentage = PercentageValueObject.create(props?.budgetPercentage ?? DEFAULT_BUDGET_PERCENTAGE_VALUE);

		const description = BudgetDescriptionValueObject.create(props?.description ?? 'valid_description');

		const reasons = props?.reasons?.map((reason) => this.reasonMock.domain(reason)) ?? [this.reasonMock.domain()];

		const observer = ChangesObserver.init<unknown>(reasons);
		observer.add(balanceAvailable);
		observer.add(budgetPercentage);
		observer.add(description);

		const result = observer.getResult();
		if (result.isFailure) {
			return Result.fail(result.errorValue());
		}

		return BudgetBoxAggregate.create(
			{
				ID,
				balanceAvailable: balanceAvailable.getResult(),
				budgetPercentage: budgetPercentage.getResult(),
				description: description.getResult(),
				isPercentage: props?.isPercentage ?? false,
				ownerId,
				reasons: reasons.map((reason) => reason.getResult()),
				createdAt: props?.createdAt ?? new Date('2022-01-01 00:00:00'),
				updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
				deletedAt: undefined,
				isDeleted: false,
			}
		);

	}
	model (props?: Partial<IBudgetBox>): IBudgetBox {
		return {
			id: props?.id ?? 'valid_id',
			balanceAvailable: props?.balanceAvailable ?? { value:1000, currency: CURRENCY },
			budgetPercentage: props?.budgetPercentage ?? DEFAULT_BUDGET_PERCENTAGE_VALUE,
			description: props?.description ?? 'valid_description',
			isPercentage: props?.isPercentage ?? false,
			ownerId: props?.ownerId ?? 'valid_owner_id',
			reasons: props?.reasons ?? [this.reasonMock.model()],
			createdAt: props?.createdAt ?? new Date('2022-01-01 00:00:00'),
			updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
			deletedAt: undefined,
			isDeleted: false,
		};
	}
}

import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";
import { IDomainService } from "@modules/shared/interfaces/domain-service.interface";
import { IBudgetBoxQueryService } from "@modules/budget-box/infra/services/queries/budget-box-query.interface";

interface Dto {
	ownerId: string;
	budgetPercentage: number;
	budgetBoxId: string;
}

export class CanChangeBudgetBoxPercentageDomainService implements IDomainService<Dto, Result<boolean>>{
	constructor (
		@Inject('BudgetBoxQueryService')
		private readonly connection: IBudgetBoxQueryService
	) { }
	async execute ({ ownerId, budgetPercentage, budgetBoxId }: Dto): Promise<Result<boolean>> {
		const maxPercentage = 100;
		const initialValue = 0;
		
		const budgetBoxes = await this.connection.getBudgetBoxesByOwnerId(ownerId);

		const budgetBoxToChange = budgetBoxes.find(
			(budgetBox) => budgetBox.id === budgetBoxId && budgetBox.isPercentage
		);

		if (!budgetBoxToChange) {
			return Result.fail('Could not find budget box', 'NOT_FOUND');
		}

		const totalPercentage = budgetBoxes.reduce((total, budgetBox) => {
			if (budgetBox.isPercentage) {
				return total + budgetBox.budgetPercentage;
			}
			return total;
		}, initialValue);

		const oldPercentageValue = budgetBoxToChange.budgetPercentage;

		const totalSum = ((totalPercentage + budgetPercentage) - oldPercentageValue);
		
		const canAllocate = totalSum <= maxPercentage;
		
		if (canAllocate) {
			return Result.ok(canAllocate);
		}
		
		const available = maxPercentage - totalPercentage;
		return Result.fail(`Could not allocate percentage to budget-box. ${totalPercentage}% already allocated. Available ${available}%`);
	}
}

export default CanChangeBudgetBoxPercentageDomainService;

import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";
import { IDomainService } from "@modules/shared/interfaces/domain-service.interface";
import { IBudgetBoxQueryService } from "@modules/budget-box/infra/services/queries/budget-box-query.interface";

interface Dto {
	ownerId: string;
	budgetPercentage: number;
	isPercentage: boolean;
}

export class CanAllocatePercentageToBudgetBoxDomainService implements IDomainService<Dto, Result<boolean>>{
	constructor (
		@Inject('BudgetBoxQueryService')
		private readonly connection: IBudgetBoxQueryService
	) { }
	async execute ({ ownerId, budgetPercentage, isPercentage  }: Dto): Promise<Result<boolean>> {
		const maxPercentage = 100;
		const initialValue = 0;
		
		if(!isPercentage) return Result.ok(!isPercentage);

		const budgetBoxes = await this.connection.getBudgetBoxesByOwnerId(ownerId);

		const totalPercentageAllocated = budgetBoxes.reduce((total, budgetBox) => {
			if (budgetBox.isPercentage) {
				return total + budgetBox.budgetPercentage;
			}
			return total;
		}, initialValue);

		const totalSum = totalPercentageAllocated + budgetPercentage;
		
		const canAllocate = totalSum <= maxPercentage;
		
		if (canAllocate) {
			return Result.ok(canAllocate);
		}
		
		const available = maxPercentage - totalPercentageAllocated;
		return Result.fail(`Could not allocate percentage to budget-box. ${totalPercentageAllocated}% already allocated. Available ${available}%`);
	}
}

export default CanAllocatePercentageToBudgetBoxDomainService;

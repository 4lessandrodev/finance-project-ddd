import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";
import { IDomainService } from "../interfaces/domain-service.interface";
import { IBudgetBoxConnection } from "./budget-box-connection.interface";

interface Dto {
	ownerId: string;
	budgetPercentage: number;
}

export class CanAllocatePercentageToBudgetBoxDomainService implements IDomainService<Dto, Result<boolean>>{
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly connection: IBudgetBoxConnection
	) { }
	async execute ({ ownerId, budgetPercentage }: Dto): Promise<Result<boolean>> {
		const maxPercentage = 100;
		const initialValue = 0;
		
		const budgetBoxes = await this.connection.findBudgetBoxesByUserId(ownerId);

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
		
		return Result.fail('100% already allocated');
	}
}

export default CanAllocatePercentageToBudgetBoxDomainService;

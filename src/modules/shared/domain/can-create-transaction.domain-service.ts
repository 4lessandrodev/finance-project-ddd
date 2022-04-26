import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";
import { IDomainService } from "@modules/shared/interfaces/domain-service.interface";
import { IBudgetBoxConnection } from "./budget-box-connection.interface";

interface Dto {
	userId: string;
}

export class CanCreateTransactionDomainService implements IDomainService<Dto, Result<boolean>>{
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly connection: IBudgetBoxConnection
	) { }
	async execute ({ userId: ownerId }: Dto): Promise<Result<boolean>> {
		try {

			const maxPercentage = 100;
			const initialValue = 0;
		
			const budgetBoxes = await this.connection.findBudgetBoxesByUserId(ownerId);

			const totalPercentageAllocated = budgetBoxes.reduce((total, budgetBox) => {
				if (budgetBox.isPercentage) {
					return total + budgetBox.budgetPercentage;
				}
				return total;
			}, initialValue);
		
			const canCreateTransaction = totalPercentageAllocated === maxPercentage;
		
			if (canCreateTransaction) {
				return Result.ok(canCreateTransaction);
			}
		
			const available = maxPercentage - totalPercentageAllocated;
			return Result.fail(`You must allocate 100% on budget boxes. ${available}% not allocated`);
						
		} catch (error) {
			return Result.fail(`Internal Server Error On CanCreateTransaction Proxy`, 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default CanCreateTransactionDomainService;

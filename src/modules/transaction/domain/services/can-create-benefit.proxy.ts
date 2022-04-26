import { IBudgetBoxConnection, IDomainService } from "@modules/shared";
import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";

export interface CanCreateBenefitDto {
	userId: string;
	budgetBoxId: string;
}

export class CanCreateBenefit implements IDomainService<CanCreateBenefitDto, Result<boolean>> {
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly budgetBoxConnection: IBudgetBoxConnection
	){}
	async execute (data: CanCreateBenefitDto): Promise<Result<boolean>> {
		try {
			
			const budgetBox = await this.budgetBoxConnection.findBudgetBoxByIdAndUserId({
				id: data.budgetBoxId, ownerId: data.userId
			});

			if (!budgetBox) {
				return Result.fail('Budget Box Does Not Exists', 'USE_PROXY');
			}

			const isPercentage = budgetBox.isPercentage;

			if (isPercentage) {
				return Result.fail('This Budget Box is calculated by Percentage', 'USE_PROXY');
			}

			return Result.ok(!isPercentage);
		} catch (error) {
			return Result.fail('Internal Server Error On CanCreateBenefit Proxy', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default CanCreateBenefit;

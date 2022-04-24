import { IBudgetBoxConnection, IDomainService } from "@modules/shared";
import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";

export interface CanCreateBenefitDto {
	userId: string;
	budgetBoxId: string;
	total: number;
}

export class CanCreateExpense implements IDomainService<CanCreateBenefitDto, Result<boolean>> {
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly budgetBoxConnection: IBudgetBoxConnection
	){}
	async execute (data: CanCreateBenefitDto): Promise<Result<boolean>> {
		const budgetBox = await this.budgetBoxConnection.findBudgetBoxByIdAndUserId({
			id: data.budgetBoxId, ownerId: data.userId
		});

		if (!budgetBox) {
			return Result.fail('Budget Box Does Not Exists', 'USE_PROXY');
		}

		const enoughBalance = budgetBox.balanceAvailable >= data.total;

		if (!enoughBalance) {
			return Result.fail(`Insufficient Funds. Available: ${budgetBox.balanceAvailable}`, 'USE_PROXY');
		}

		return Result.ok(enoughBalance);
	}
}

export default CanCreateExpense;

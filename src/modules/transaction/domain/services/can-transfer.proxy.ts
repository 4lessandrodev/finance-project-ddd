import { IBudgetBoxConnection, IDomainService } from "@modules/shared";
import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";

export interface CanTransferDto {
	userId: string;
	sourceBoxId: string;
	destinationBoxId: string;
	total: number;
}

export class CanTransfer implements IDomainService<CanTransferDto, Result<boolean>> {
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly budgetBoxConnection: IBudgetBoxConnection
	){}
	async execute (data: CanTransferDto): Promise<Result<boolean>> {
		try {

			const sourceBox = await this.budgetBoxConnection.findBudgetBoxByIdAndUserId({
				id: data.sourceBoxId, ownerId: data.userId
			});

			const destinationBox = await this.budgetBoxConnection.findBudgetBoxByIdAndUserId({
				id: data.destinationBoxId, ownerId: data.userId
			});

			if (!sourceBox || !destinationBox) {
				return Result.fail('Budget Box Does Not Exists', 'USE_PROXY');
			}

			const enoughBalance = sourceBox.balanceAvailable.value >= data.total;

			if (!enoughBalance) {
				return Result.fail('The Budget Box Does Not Have Enough Balance', 'USE_PROXY');
			}

			return Result.ok(enoughBalance);
						
		} catch (error) {
			return Result.fail('Internal Server Error On CanTransfer Proxy', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default CanTransfer;

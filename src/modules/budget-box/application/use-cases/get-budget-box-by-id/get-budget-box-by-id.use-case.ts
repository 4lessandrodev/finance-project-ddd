import { IBudgetBoxQueryService } from "@modules/budget-box/infra/services/queries/budget-box-query.interface";
import { IBudgetBox } from "@modules/shared";
import { Inject } from "@nestjs/common";
import { IUseCase, Result } from "types-ddd";
import Dto from '@modules/budget-box/application/use-cases/get-budget-box-by-id/get-budget-box-by-id.dto';

export class GetBudgetBoxByIdUseCase implements IUseCase<Dto, Result<IBudgetBox, string>>{

	constructor (
		@Inject('BudgetBoxQueryService')
		private readonly budgetRepo: IBudgetBoxQueryService
	){}

	async execute ({ budgetBoxId, ownerId }: Dto): Promise<Result<IBudgetBox>> {
		try {

			const budgetBoxOrNull = await this.budgetRepo.getBudgetBoxByIdAndOwnerId({ id: budgetBoxId, ownerId });

			if (!budgetBoxOrNull) {
				return Result.fail('Budget Box Not Found', 'NOT_FOUND');
			}

			return Result.ok(budgetBoxOrNull);
		} catch (error) {
			return Result.fail('Internal Server Error on Get Budget Box By Id Use Case', 'INTERNAL_SERVER_ERROR');
		}
	};
}

export default GetBudgetBoxByIdUseCase;

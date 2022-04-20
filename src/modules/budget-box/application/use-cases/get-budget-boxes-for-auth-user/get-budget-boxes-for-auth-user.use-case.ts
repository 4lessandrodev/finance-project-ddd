import { IBudgetBoxQueryService } from "@modules/budget-box/infra/services/queries/budget-box-query.interface";
import { IBudgetBox } from "@modules/shared";
import { Inject, Injectable } from "@nestjs/common";
import { IUseCase, Result } from "types-ddd";
import Dto from './get-budget-boxes-for-auth-user.dto';

@Injectable()
export class GetBudgetBoxesForAuthUserUseCase implements IUseCase<Dto, Result<IBudgetBox[]>> {

	constructor (
		@Inject('BudgetBoxQueryService')
		private readonly budgetBoxQueryService: IBudgetBoxQueryService
	){}

	async execute ({ ownerId }: Dto): Promise<Result<IBudgetBox[], string >> {
		try {
			const budgetBoxesFound = await this
				.budgetBoxQueryService
				.getBudgetBoxesByOwnerId(ownerId);

			return Result.ok(budgetBoxesFound);

		} catch (error) {
			return Result.fail('Internal Server Error on Get Budget Boxes For Auth User UseCase', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default GetBudgetBoxesForAuthUserUseCase;

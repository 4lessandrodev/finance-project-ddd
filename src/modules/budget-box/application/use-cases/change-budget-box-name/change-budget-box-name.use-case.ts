import BudgetDescriptionValueObject from "@modules/budget-box/domain/budget-description.value-object";
import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { Inject } from "@nestjs/common";
import { IUseCase, Result } from "types-ddd";
import Dto from "./change-budget-box-name.dto";

export class ChangeBudgetBoxNameUseCase implements IUseCase<Dto, Result<void>>{

	constructor (
		@Inject('BudgetBoxRepository')
		private readonly budgetBoxRepo: IBudgetBoxRepository
	){}

	async execute ({ ownerId, description, budgetBoxId: id }: Dto): Promise<Result<void, string>>{
		try {
			const budgetBoxOrNull = await this.budgetBoxRepo.findOne({ id, ownerId });

			if (!budgetBoxOrNull) {
				return Result.fail('Budget Box Not Found', 'NOT_FOUND');
			}

			const descriptionOrError = BudgetDescriptionValueObject.create(description);
			
			if (descriptionOrError.isFailure) {
				const message = descriptionOrError.errorValue();
				return Result.fail(message);
			}
			
			const budgetBox = budgetBoxOrNull;
			const descriptionVo = descriptionOrError.getResult();

			budgetBox.changeDescription(descriptionVo);
			await this.budgetBoxRepo.save(budgetBox);
			return Result.success();

		} catch (error) {
			return Result.fail('Internal Server Error on Change Budget Box Name Use Case', 'INTERNAL_SERVER_ERROR');
		}
	};
}

export default ChangeBudgetBoxNameUseCase;

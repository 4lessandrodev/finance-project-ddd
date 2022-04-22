import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import PercentageValueObject from "@modules/budget-box/domain/percentage.value-object";
import { Inject } from "@nestjs/common";
import { IUseCase, Result } from "types-ddd";
import Dto from "./change-budget-box-percentage.dto";

export class ChangeBudgetBoxPercentageUseCase implements IUseCase<Dto, Result<void>>{

	constructor (
		@Inject('BudgetBoxRepository')
		private readonly budgetRepo: IBudgetBoxRepository
	){}

	async execute ({ budgetBoxId: id, budgetPercentage, ownerId }: Dto) : Promise<Result<void, string>> {
		try {
			const budgetBoxOrNull = await this.budgetRepo.findOne({ id, ownerId });

			if (!budgetBoxOrNull) {
				return Result.fail('Budget Box Not Found', 'NOT_FOUND');
			}

			const budgetBox = budgetBoxOrNull;

			const percentageOrError = PercentageValueObject.create(budgetPercentage);

			if (percentageOrError.isFailure) {
				return Result.fail(percentageOrError.error);	
			}

			const percentage = percentageOrError.getResult();

			budgetBox.changePercentage(percentage);

			await this.budgetRepo.save(budgetBox);
			
			return Result.success();
		} catch (error) {
			return Result.fail(
				'Internal Server Error on Change Budget Box Percentage Use Case', 'INTERNAL_SERVER_ERROR'
			);
		}
	};
}

export default ChangeBudgetBoxPercentageUseCase;

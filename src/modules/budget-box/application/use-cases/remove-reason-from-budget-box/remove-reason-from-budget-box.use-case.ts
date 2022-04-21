import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { Inject } from "@nestjs/common";
import { DomainId, IUseCase, Result } from "types-ddd";
import Dto from "./remove-reason-from-budget-box-dto";

export class RemoveReasonFromBudgetBoxUseCase implements IUseCase<Dto, Result<void>>{

	constructor (
		@Inject('BudgetBoxRepository')
		private readonly budgetBoxRepo: IBudgetBoxRepository
	){}

	async execute ({budgetBoxId:id, ownerId, reasonId }: Dto) : Promise<Result<void, string>> {
		try {
			
			const budgetBoxOrNull = await this.budgetBoxRepo.findOne({ id, ownerId });

			if (!budgetBoxOrNull) {
				return Result.fail('Budget Box Not Found', 'NOT_FOUND');	
			}

			const budgetBox = budgetBoxOrNull;

			const removed = budgetBox.removeReasonById(DomainId.create(reasonId));

			if (!removed) {
				return Result.fail('Reason not found on budget box', 'NOT_FOUND');
			}
			
			await this.budgetBoxRepo.save(budgetBox);

			return Result.success();

		} catch (error) {
			return Result.fail('Internal Server Error on Remove Reason from Budget Box', 'INTERNAL_SERVER_ERROR');
		}
	};
}

export default RemoveReasonFromBudgetBoxUseCase;

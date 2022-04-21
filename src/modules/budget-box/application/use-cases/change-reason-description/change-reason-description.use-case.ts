import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import ReasonDescriptionValueObject from "@modules/budget-box/domain/reason-description.value-object";
import { Inject, Injectable } from "@nestjs/common";
import { DomainId, IUseCase, Result } from "types-ddd";
import Dto from './change-reason-description.dto';

@Injectable()
export class ChangeReasonDescriptionUseCase implements IUseCase<Dto, Result<void>>{
	
	constructor (
		@Inject('BudgetBoxRepository')
		private readonly budgetBoxRepo: IBudgetBoxRepository
	){}

	async execute ({ budgetBoxId, reasonDescription, ownerId, reasonId }: Dto) : Promise<Result<void, string>>{
		try {

			const budgetBoxOrNull = await this.budgetBoxRepo.findOne({ id: budgetBoxId, ownerId });

			if (!budgetBoxOrNull) {
				return Result.fail('Budget Box Not Found','NOT_FOUND');	
			}

			const reasonDescriptionOrError = ReasonDescriptionValueObject.create(reasonDescription);

			if (reasonDescriptionOrError.isFailure) {
				const message = reasonDescriptionOrError.errorValue();
				return Result.fail(message);
			}

			const description = reasonDescriptionOrError.getResult();
			const ID = DomainId.create(reasonId);

			const budgetBox = budgetBoxOrNull;

			const updated = budgetBox.changeReasonDescription(ID, description);

			if (!updated) {
				return Result.fail('Reason does not found on Budget Box','NOT_FOUND');	
			}
			
			await this.budgetBoxRepo.save(budgetBox);

			return Result.success();

		} catch (error) {
			return Result.fail('Internal Server Error on Change Reason Description Use Case', 'INTERNAL_SERVER_ERROR');
		}
	};
}

export default ChangeReasonDescriptionUseCase;

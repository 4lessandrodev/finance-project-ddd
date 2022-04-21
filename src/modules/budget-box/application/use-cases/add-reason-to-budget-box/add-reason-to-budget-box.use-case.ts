import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import ReasonDescriptionValueObject from "@modules/budget-box/domain/reason-description.value-object";
import ReasonDomainEntity from "@modules/budget-box/domain/reason.domain-entity";
import { Inject, Injectable } from "@nestjs/common";
import { DomainId, IUseCase, Result } from "types-ddd";
import Dto from './add-reason-to-budget-box.dto';

@Injectable()
export class AddReasonToBudgetBoxUseCase implements IUseCase<Dto, Result<void>>{
	
	constructor (
		@Inject('BudgetBoxRepository')
		private readonly budgetBoxRepo: IBudgetBoxRepository
	){}

	async execute ({ budgetBoxId, reasonDescription, ownerId }: Dto) : Promise<Result<void, string>>{
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
			const ID = DomainId.create();
			const reasonEntityOrError = ReasonDomainEntity.create({ ID, description });

			const reasonEntity = reasonEntityOrError.getResult();
			const budgetBox = budgetBoxOrNull;

			budgetBox.addReason(reasonEntity);
			
			await this.budgetBoxRepo.save(budgetBox);

			return Result.success();

		} catch (error) {
			return Result.fail('Internal Server Error on Add Reason To Budget Box', 'INTERNAL_SERVER_ERROR');
		}
	};
}

export default AddReasonToBudgetBoxUseCase;

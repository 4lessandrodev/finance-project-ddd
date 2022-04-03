import { CURRENCY } from "@config/env";
import BudgetBoxAggregate from "@modules/budget-box/domain/budget-box.aggregate";
import BudgetDescriptionValueObject from "@modules/budget-box/domain/budget-description.value-object";
import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import PercentageValueObject from "@modules/budget-box/domain/percentage.value-object";
import { Inject, Injectable } from "@nestjs/common";
import { ChangesObserver, CurrencyValueObject, DomainId, IUseCase, Result } from "types-ddd";
import CreateBudgetBoxDto from "./create-budget-box.dto";

@Injectable()
export class CreateBudgetBoxUseCase implements IUseCase<CreateBudgetBoxDto, Result<void>>{

	constructor (
		@Inject('BudgetBoxRepository')
		private readonly budgetBoxRepo: IBudgetBoxRepository
	) { }

	async execute (dto: CreateBudgetBoxDto): Promise<Result<void, string>> {
		try {

			const balanceAvailableOrError = CurrencyValueObject.create({
				currency: CURRENCY,
				value: 0
			});

			const descriptionOrError = BudgetDescriptionValueObject.create(dto.description);

			const budgetPercentageOrError = PercentageValueObject.create(dto.budgetPercentage);

			const observer = ChangesObserver.init<unknown>([
				balanceAvailableOrError,
				descriptionOrError,
				budgetPercentageOrError
			]);
		
			const result = observer.getResult();

			if (result.isFailure) {
				const message = result.errorValue();
				return Result.fail(message, 'UNPROCESSABLE_ENTITY');
			}

			const budgetBoxOrError = BudgetBoxAggregate.create(
				{
					ID: DomainId.create(),
					balanceAvailable: balanceAvailableOrError.getResult(),
					reasons: [],
					ownerId: DomainId.create(dto.ownerId),
					isPercentage: dto.isPercentage,
					description: descriptionOrError.getResult(),
					budgetPercentage: budgetPercentageOrError.getResult()
				}
			);
		
			const budgetBox = budgetBoxOrError.getResult();

			await this.budgetBoxRepo.save(budgetBox);

			return Result.success();
						
		} catch (error) {
			return Result.fail('Internal Server Error on Create BudgetBox UseCase', 'INTERNAL_SERVER_ERROR');
		}
	};
}

export default CreateBudgetBoxDto;

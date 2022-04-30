import { IBudgetBoxRepository } from '@modules/budget-box/domain/interfaces/budget-box.repository.interface';
import { Inject } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import DeleteBudgetBoxDto from './delete-budget-box.dto';

export class DeleteBudgetBoxUseCase implements IUseCase<DeleteBudgetBoxDto, Result<void, string>>{
	constructor (
		@Inject('BudgetBoxRepository')
		private readonly budgetBoxRepo: IBudgetBoxRepository
	) { }
	
	async execute ({ budgetBoxId: id, userId: ownerId }: DeleteBudgetBoxDto): Promise<Result<void, string>> {
		try {

			const budgetBoxOrNull = await this.budgetBoxRepo.findOne({ id, ownerId });

			if (!budgetBoxOrNull) {
				return Result.fail('Budget Box Does Not Exists', 'NOT_FOUND');
			}

			const budgetBox = budgetBoxOrNull;

			const hasNotBalance = budgetBox.balanceAvailable.isEqualTo(0);

			if (!hasNotBalance) {
				return Result.fail('The budget box must have a zero balance', 'CONFLICT');
			}

			budgetBox.delete();

			await this.budgetBoxRepo.delete({ id });

			return Result.success();

		} catch (error) {
			return Result.fail('Internal Server Error on Delete Budget BoxUse Case', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default DeleteBudgetBoxUseCase;

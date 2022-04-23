import { CURRENCY } from "@config/env";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import TransactionBudgetBoxNameValueObject from "@modules/transaction/domain/budget-box-name.value-object";
import { IBudgetBoxConnection, IDomainService } from "@modules/shared";
import { Inject } from "@nestjs/common";
import { CurrencyValueObject, DomainId } from "types-ddd";

export interface PercentageCalculationDomainServiceDto {
	userId: string;
	total: number;
}

export class CreatePercentageTransactionCalculationDomainService implements
	IDomainService<PercentageCalculationDomainServiceDto, TransactionCalculationValueObject[]>{
	
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly budgetBoxConnection: IBudgetBoxConnection
	){}
	
	async execute ({ userId, total }: PercentageCalculationDomainServiceDto): Promise<TransactionCalculationValueObject[]> {
		const allBudgetBoxes = await this.budgetBoxConnection.findBudgetBoxesByUserId(userId);
		const budgetBoxes = allBudgetBoxes.filter((budgetBox) => budgetBox.isPercentage);

		const transactions = budgetBoxes.map((budgetBox) => {

			const currency = CurrencyValueObject
				.create({ currency: CURRENCY, value: total })
				.getResult().multiplyBy(budgetBox.budgetPercentage)
				.getResult().divideBy(100).getResult();
			
			const budgetBoxId = DomainId.create(budgetBox.id);

			const budgetBoxName = TransactionBudgetBoxNameValueObject
				.create(budgetBox.description).getResult();

			const transaction = TransactionCalculationValueObject.create({
				budgetBoxId,
				budgetBoxName,
				currency
			});

			return transaction.getResult();
		});

		return transactions;
	}

}

export default CreatePercentageTransactionCalculationDomainService;

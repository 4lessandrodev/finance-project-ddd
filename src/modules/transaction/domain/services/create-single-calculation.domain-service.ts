import { CURRENCY } from "@config/env";
import { IBudgetBoxConnection, IDomainService } from "@modules/shared";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import { Inject } from "@nestjs/common";
import { CurrencyValueObject, DomainId } from "types-ddd";
import TransactionBudgetBoxNameValueObject from "@modules/transaction/domain/budget-box-name.value-object";

export interface CreateSingleCalculationDto {
	userId: string;
	budgetBoxId: string;
	total: number;
}

export class CreateSingleCalculationDomainService implements IDomainService<CreateSingleCalculationDto, TransactionCalculationValueObject> {
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly budgetBoxConnection: IBudgetBoxConnection
	){}
	async execute (data: CreateSingleCalculationDto): Promise<TransactionCalculationValueObject> {
		const budgetBox = await this.budgetBoxConnection.findBudgetBoxByIdAndUserId({
			id: data.budgetBoxId, ownerId: data.userId
		});

		const transaction = TransactionCalculationValueObject.create({
			budgetBoxId: DomainId.create(data.budgetBoxId),
			budgetBoxName: TransactionBudgetBoxNameValueObject
				.create(budgetBox?.description ?? 'operational').getResult(),
			currency: CurrencyValueObject.create({ value: data.total, currency: CURRENCY }).getResult()
		});

		return transaction.getResult();
	}
}

export default CreateSingleCalculationDomainService;

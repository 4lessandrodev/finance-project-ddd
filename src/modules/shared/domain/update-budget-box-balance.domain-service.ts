import { CurrencyValueObject, DomainId, Result } from "types-ddd";
import IDomainService from "@shared/interfaces/domain-service.interface";
import { Inject } from "@nestjs/common";
import { IBudgetBoxConnection } from "./budget-box-connection.interface";
import { CURRENCY } from "@config/env";

export interface IBoxes {
	budgetBoxId: DomainId;
	value: CurrencyValueObject;
}

export type OperationType = 'SUM' | 'SUBTRACT';

export interface UpdateBudgetBoxBalanceDto {
	budgetBoxes: IBoxes[];
	operationType: OperationType;
}

export class UpdateBudgetBoxBalanceDomainService implements IDomainService<UpdateBudgetBoxBalanceDto, Result<void>>{
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly connection: IBudgetBoxConnection
	){}
	async execute ({ budgetBoxes, operationType }: UpdateBudgetBoxBalanceDto): Promise<Result<void, string>> {
		try {

			const ids = budgetBoxes.map((box) => box.budgetBoxId.uid);

			const budgetBoxesDocuments = await this.connection.getBudgetBoxesByIds(ids);

			const calculateValueToApply = (currentDocumentValue: number, eventValue: CurrencyValueObject): number => {
				const currency = CurrencyValueObject.create({ value: currentDocumentValue, currency: CURRENCY }).getResult();
				if (operationType === 'SUM') {
					return currency.add(eventValue.value).getResult().value;
				} 
				return currency.subtractBy(eventValue.value).getResult().value;
			};

			const documentToUpdate = budgetBoxesDocuments.map((model) => {
				const eventData = budgetBoxes.find((box) => box.budgetBoxId.uid === model.id);
				if (eventData) {
					const totalToApply = calculateValueToApply(model.balanceAvailable, eventData.value);
					model.balanceAvailable = totalToApply;
				}
				return model;
			});

			const isSuccess = await this.connection.updateBudgetBoxesBalance(documentToUpdate);

			if (isSuccess) {
				return Result.success();
			}

			return Result.fail('Error On Update Budget Box Balance Domain Service', 'SERVICE_UNAVAILABLE');
			
		} catch (error: any) {
			return Result.fail(`Internal Server Error: ${error.message}`, 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default UpdateBudgetBoxBalanceDomainService;

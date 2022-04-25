import { CurrencyValueObject, DomainId, Result } from "types-ddd";
import IDomainService from "@shared/interfaces/domain-service.interface";
import { Inject } from "@nestjs/common";
import { IBudgetBoxConnection } from "./budget-box-connection.interface";
import { CURRENCY } from "@config/env";

export interface IBoxes {
	budgetBoxId: DomainId;
	value: CurrencyValueObject;
}

export type OperationType = 'SUM' | 'SUBTRACT' | 'NONE';

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

			if (operationType === 'NONE') return Result.success();

			const ids = budgetBoxes.map((box) => box.budgetBoxId.uid);

			const budgetBoxesDocuments = await this.connection.getBudgetBoxesByIds(ids);

			const calculateValueToApply = (currentDocumentValue: number, eventValue: CurrencyValueObject): number => {
				const currency = CurrencyValueObject
					.create({ value: currentDocumentValue, currency: CURRENCY })
					.getResult();
				
				if (operationType === 'SUM') {
					return currency.add(eventValue.value).getResult().value;

				} else if (operationType === 'SUBTRACT') {
					return currency.subtractBy(eventValue.value).getResult().value;

				}
				return currentDocumentValue;
			};

			const documentToUpdate = budgetBoxesDocuments.map((model) => {
				const eventData = budgetBoxes.find((box) => box.budgetBoxId.uid === model.id);
				if (!eventData) {
					return model;
				}
				const totalToApply = calculateValueToApply(model.balanceAvailable.value, eventData.value);
				const balanceAvailable = { ...model.balanceAvailable, value: totalToApply };
				return Object.assign({}, model, { balanceAvailable });
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

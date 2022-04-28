import { CurrencyValueObject, DomainId, Result } from "types-ddd";
import IDomainService from "@shared/interfaces/domain-service.interface";
import { Inject } from "@nestjs/common";
import { IBudgetBoxConnection } from "./budget-box-connection.interface";
import CalculateValueToUpdate from "../utils/calculate";

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
		private readonly connection: IBudgetBoxConnection,

		@Inject(CalculateValueToUpdate)
		private readonly calculator: CalculateValueToUpdate
	){}
	async execute ({ budgetBoxes, operationType }: UpdateBudgetBoxBalanceDto): Promise<Result<void, string>> {
		try {

			if (operationType === 'NONE') return Result.success();

			const ids = budgetBoxes.map((box) => box.budgetBoxId.uid);

			const budgetBoxFromDataBase = await this.connection.getBudgetBoxesByIds(ids);

			const documentsToUpdate = this.calculator.calc({
				budgetBoxFromDataBase,
				operationType,
				budgetBoxesDto: budgetBoxes
			});
			
			const isSuccess = await this.connection.updateBudgetBoxesBalance(documentsToUpdate);

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

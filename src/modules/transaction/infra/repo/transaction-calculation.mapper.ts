import { ICalculation } from "@modules/shared";
import TransactionBudgetBoxNameValueObject from "@modules/transaction/domain/budget-box-name.value-object";
import TransactionCalculationValueObject from "@modules/transaction/domain/transaction-calculations.value-object";
import { Injectable } from "@nestjs/common";
import { CurrencyValueObject, DomainId, Result, TMapper } from "types-ddd";

@Injectable()
export class TransactionCalculationToDomain implements TMapper<ICalculation, TransactionCalculationValueObject>{
	map (target: ICalculation): Result<TransactionCalculationValueObject, string> {
		
		const budgetBoxNameOrError = TransactionBudgetBoxNameValueObject.create(target.budgetBoxName);
		const currencyOrError = CurrencyValueObject.create(target.currency);
		const budgetBoxId = DomainId.create(target.budgetBoxId);

		return TransactionCalculationValueObject.create({
			budgetBoxId,
			budgetBoxName: budgetBoxNameOrError.getResult(),
			currency: currencyOrError.getResult(),
		});
	};
}

export default TransactionCalculationToDomain;

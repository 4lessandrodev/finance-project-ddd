import { CURRENCY } from "@config/env";
import { CurrencyValueObject } from "types-ddd";
import { IBoxes, OperationType } from "../domain/update-budget-box-balance.domain-service";
import IBudgetBox from "../interfaces/budget-box-model.interface";

export interface ICalculate {
	budgetBoxFromDataBase: IBudgetBox[];
	budgetBoxesDto: IBoxes[];
	operationType: OperationType;
}

export class CalculateValueToUpdate {
	calc (props: ICalculate): IBudgetBox[] {
		
		const { operationType, budgetBoxFromDataBase, budgetBoxesDto } = props;

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

		const documentToUpdate = budgetBoxFromDataBase.map((model): IBudgetBox => {
			const eventData = budgetBoxesDto.find((box) => box.budgetBoxId.uid === model.id);
			if (!eventData) {
				return model;
			}
			const totalToApply = calculateValueToApply(model.balanceAvailable.value, eventData.value);
			const balanceAvailable = { ...model.balanceAvailable, value: totalToApply };
			return Object.assign({}, model, { balanceAvailable });
		});

		return documentToUpdate;
	}
}

export default CalculateValueToUpdate;

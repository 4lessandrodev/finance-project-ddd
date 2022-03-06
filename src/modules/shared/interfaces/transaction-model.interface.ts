import { transactionStatus } from "@modules/transaction/domain/transaction-status.value-object";
import { transactionType } from "@modules/transaction/domain/transaction-type.value-object";

export interface ICurrency {
	value: number;
	currency: 'BRL' | 'USD' | 'EUR' | 'JPY'
}

export interface ICalculation {
	budgetBoxId: string;
	currency: ICurrency;
}

export interface ITransaction {
	
	readonly id: string;

	userId: string;

	reasonId: string;

	paymentDate: Date;

	transactionType: transactionType;

	status: transactionStatus;
	
	transactionCalculations: ICalculation[];

	note: string | null;

	attachment: string | null;

	createdAt: Date;

	updatedAt: Date;
}

export default ITransaction;

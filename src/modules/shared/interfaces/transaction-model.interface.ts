import { transactionStatus } from "@modules/transaction/domain/transaction-status.value-object";
import { transactionType } from "@modules/transaction/domain/transaction-type.value-object";

export interface ICurrency {
	readonly value: number;
	readonly currency: 'BRL' | 'USD' | 'EUR' | 'JPY'
}

export interface ICalculation {
	budgetBoxName: string;
	budgetBoxId: string;
	readonly currency: ICurrency;
}

export interface ITransaction {
	
	readonly id: string;

	readonly userId: string;

	readonly reason: string;

	readonly paymentDate: Date;

	readonly transactionType: transactionType;

	status: transactionStatus;
	
	readonly transactionCalculations: readonly ICalculation[];

	note: string | null;

	attachment: string | null;

	readonly createdAt: Date;

	updatedAt: Date;

	isDeleted?: boolean;

	deletedAt?: Date;

	readonly totalValue?: ICurrency;
}

export default ITransaction;

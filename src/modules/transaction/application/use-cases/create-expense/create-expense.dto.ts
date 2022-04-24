import { transactionStatus } from "@modules/transaction/domain/transaction-status.value-object";

export interface CreateExpenseDto {
	userId: string;
	budgetBoxId: string;
	total: number;
	paymentDate?: Date;
	reason: string;
	status: transactionStatus;
	attachment?: string;
	note?: string;
}

export default CreateExpenseDto;

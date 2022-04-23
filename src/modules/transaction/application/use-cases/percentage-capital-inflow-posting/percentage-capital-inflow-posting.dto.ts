import { transactionStatus } from "@modules/transaction/domain/transaction-status.value-object";

export interface PercentageCapitalInflowPostingDto {
	total: number;
	userId: string;
	reason: string;
	status: transactionStatus;
	paymentDate?: Date;
	note?: string;
	attachment?: string;
}

export default PercentageCapitalInflowPostingDto;

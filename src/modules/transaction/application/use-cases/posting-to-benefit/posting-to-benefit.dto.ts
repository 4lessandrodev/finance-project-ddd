import { transactionStatus } from "@modules/transaction/domain/transaction-status.value-object";

export interface PostingToBenefitDto {
	userId: string;
	budgetBoxId: string;
	total: number;
	reason: string;
	status: transactionStatus;
	paymentDate?: Date;
	attachment?: string;
	note?: string;
}

export default PostingToBenefitDto;

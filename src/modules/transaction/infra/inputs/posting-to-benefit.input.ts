import {
	transactionStatus, validTransactionStatusEnum
} from "@modules/transaction/domain/transaction-status.value-object";
import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class PostingToBenefitInput {
	@Field(() => Float)
	total!: number;

	@Field(() => String)
	reason!: string;

	@Field(() => String)
	budgetBoxId!: string;

	@Field(() => validTransactionStatusEnum)
	status!: transactionStatus;

	@Field(() => Date, { nullable: true })
	paymentDate?: Date;

	@Field(() => String, { nullable: true })
	note?: string;

	@Field(() => String, { nullable: true })
	attachment?: string;
}

export default PostingToBenefitInput;

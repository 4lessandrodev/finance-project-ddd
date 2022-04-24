import { Field, Float, InputType } from "@nestjs/graphql";
import { TransactionStatus, ValidClientTransactionStatusEnum } from "../types/transaction.types";

@InputType()
export class CreateExpenseInput {
	@Field(() => Float)
	total!: number;

	@Field(() => String)
	reason!: string;

	@Field(() => String)
	budgetBoxId!: string;

	@Field(() => ValidClientTransactionStatusEnum)
	status!: TransactionStatus;

	@Field(() => Date, { nullable: true })
	paymentDate?: Date;

	@Field(() => String, { nullable: true })
	note?: string;

	@Field(() => String, { nullable: true })
	attachment?: string;
}

export default CreateExpenseInput;

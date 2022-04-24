import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetTransactionByIdInput {
	@Field(() => String)
	transactionId!: string;
}

export default GetTransactionByIdInput;

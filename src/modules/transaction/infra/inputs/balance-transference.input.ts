import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class BalanceTransferenceInput {
	@Field(() => Float)
	total!: number;

	@Field(() => String)
	reason!: string;

	@Field(() => String)
	sourceBoxId!: string;

	@Field(() => String)
	destinationBoxId!: string;

	@Field(() => String, { nullable: true })
	note?: string;

	@Field(() => String, { nullable: true })
	attachment?: string;
}

export default BalanceTransferenceInput;

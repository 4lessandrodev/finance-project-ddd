import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChangeReasonDescriptionBoxInput {
	
	@Field(() => String)
	reasonDescription!: string;
	
	@Field(() => String)
	budgetBoxId!: string;

	@Field(() => String)
	reasonId!: string;
}

export default ChangeReasonDescriptionBoxInput;

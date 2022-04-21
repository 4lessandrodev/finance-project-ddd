import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddReasonToBudgetBoxInput {
	
	@Field(() => String)
	reasonDescription!: string;
	
	@Field(() => String)
	budgetBoxId!: string;
}

export default AddReasonToBudgetBoxInput;

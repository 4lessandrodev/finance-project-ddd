import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RemoveReasonFromBudgetBoxInput {
	
	@Field(() => String)
	reasonId!: string;
	
	@Field(() => String)
	budgetBoxId!: string;
}

export default RemoveReasonFromBudgetBoxInput;

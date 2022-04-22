import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChangeBudgetBoxNameInput {
	@Field(() => String)
	budgetBoxId!: string;

	@Field(() => String)
	description!: string;
}

export default ChangeBudgetBoxNameInput;

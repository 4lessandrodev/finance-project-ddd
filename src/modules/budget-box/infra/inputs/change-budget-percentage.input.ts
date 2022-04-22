import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class ChangeBudgetBoxPercentageInput {
	@Field(() => String)
	budgetBoxId!: string;

	@Field(() => Float)
	budgetPercentage!: number;
}

export default ChangeBudgetBoxPercentageInput;

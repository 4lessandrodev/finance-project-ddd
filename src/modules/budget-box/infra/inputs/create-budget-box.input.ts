import { Field, InputType, Float } from "@nestjs/graphql";

@InputType()
export class CreateBudgetBoxInput {
	
	@Field(() => String)
	description!: string;
	
	@Field(() => Boolean)
	isPercentage!: boolean;
	
	@Field(() => Float)
	budgetPercentage!: number;
}

export default CreateBudgetBoxInput;

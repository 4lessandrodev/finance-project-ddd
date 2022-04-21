import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetBudgetBoxByIdInput {
	@Field(() => String)
	budgetBoxId!: string;
}

export default GetBudgetBoxByIdInput;

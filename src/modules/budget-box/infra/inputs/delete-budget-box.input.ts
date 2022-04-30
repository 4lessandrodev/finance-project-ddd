import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteBudgetBoxInput {
	@Field(() => String)
	budgetBoxId!: string;
}

export default DeleteBudgetBoxInput;

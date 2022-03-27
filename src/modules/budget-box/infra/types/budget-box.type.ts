import { Field, ID, ObjectType } from "@nestjs/graphql";
import ReasonType from "./reason.type";

@ObjectType()
export class BudgetBoxType {

	@Field(() => ID)
	id!: string;

	@Field(() => String)
	description!: string;

	@Field(() => Number)
	balanceAvailable!: number;

	@Field(() => Boolean)
	isPercentage!: boolean;

	@Field(() => Number)
	budgetPercentage!: number;

	@Field(() => [ReasonType], { defaultValue: []})
	reasons!: Array<ReasonType>;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;

}

export default BudgetBoxType;

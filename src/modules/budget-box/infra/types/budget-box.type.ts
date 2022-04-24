import { ICurrency } from "@modules/shared";
import { Field, Float, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import ReasonType from "./reason.type";

enum BudgetBoxCurrencies {
	'BRL' = 'BRL',
	'USD' = 'USD',
	'EUR' = 'EUR',
	'JPY' = 'JPY'
}

type currency = keyof typeof BudgetBoxCurrencies;

registerEnumType(BudgetBoxCurrencies, {
	name: 'BudgetBoxCurrencies',
});

@ObjectType()
export class BudgetBoxCurrencyType {
	@Field(() => Float)
	value!: number;

	@Field(() => BudgetBoxCurrencies)
	currency!: currency;
}

@ObjectType()
export class BudgetBoxType {

	@Field(() => ID)
	id!: string;

	@Field(() => String)
	description!: string;

	@Field(() => BudgetBoxCurrencyType)
	balanceAvailable!: ICurrency;

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

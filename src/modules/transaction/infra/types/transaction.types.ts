import { ICalculation } from "@modules/shared";
import { transactionStatus, validTransactionStatusEnum } from "@modules/transaction/domain/transaction-status.value-object";
import { validTransactionTypeEnum, transactionType } from "@modules/transaction/domain/transaction-type.value-object";
import { Field, Float, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

registerEnumType(validTransactionTypeEnum, {
	name: 'transactionType',
});

registerEnumType(validTransactionStatusEnum, {
	name: 'transactionStatus',
});

enum Currencies {
	'BRL' = 'BRL',
	'USD' = 'USD',
	'EUR' = 'EUR',
	'JPY' = 'JPY'
}

registerEnumType(Currencies, {
	name: 'currency',
});

type currency = keyof typeof Currencies;

@ObjectType()
export class CurrencyType {
	@Field(() => Float)
	value!: number;

	@Field(() => Currencies)
	currency!: currency;
}

@ObjectType()
export class CalculationType {
	@Field(() => String)
	budgetBoxName!: string;

	@Field(() => ID)
	budgetBoxId!: string;

	@Field(() => CurrencyType)
	readonly currency!: CurrencyType;
}

@ObjectType()
export class TransactionType {
	@Field(() => ID)
	id!: string;

	@Field(() => ID)
	userId!: string;

	@Field(() => String)
	reason!: string;

	@Field(() => CurrencyType)
	totalValue!: CurrencyType;

	@Field(() => Date)
	paymentDate!: Date;

	@Field(() => validTransactionTypeEnum,
		{ name: 'transactionType' }
	)
	transactionType!: transactionType;

	@Field(() => validTransactionStatusEnum,
		{ name: 'transactionStatus' }
	)
	transactionStatus!: transactionStatus;
	
	@Field(() => [CalculationType])
	transactionCalculations!: ICalculation[];

	@Field(() => String, { nullable: true })
	note?: string;

	@Field(() => String, { nullable: true })
	attachment?: string;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;

}

export default TransactionType;

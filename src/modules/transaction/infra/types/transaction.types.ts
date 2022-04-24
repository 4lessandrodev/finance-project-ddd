import { ICalculation } from "@modules/shared";
import {
	transactionStatus, validTransactionStatusEnum
} from "@modules/transaction/domain/transaction-status.value-object";
import { validTransactionTypeEnum, transactionType } from "@modules/transaction/domain/transaction-type.value-object";
import { Field, Float, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum ValidClientTransactionStatusEnum {
	'PENDENTE' = 'PENDENTE',
	'CONCLUIDO' = 'CONCLUIDO',
}

export type TransactionStatus = keyof typeof ValidClientTransactionStatusEnum;

registerEnumType(ValidClientTransactionStatusEnum, {
	name: 'TransactionStatus'
});

registerEnumType(validTransactionTypeEnum, {
	name: 'TransactionTypeEnum',
});

registerEnumType(validTransactionStatusEnum, {
	name: 'TransactionStatusEnum',
});

enum TransactionCurrencies {
	'BRL' = 'BRL',
	'USD' = 'USD',
	'EUR' = 'EUR',
	'JPY' = 'JPY'
}

registerEnumType(TransactionCurrencies, {
	name: 'TransactionCurrencies',
});

type currency = keyof typeof TransactionCurrencies;

@ObjectType()
export class CurrencyType {
	@Field(() => Float)
	value!: number;

	@Field(() => TransactionCurrencies)
	currency!: currency;
}

@ObjectType()
export class TransactionCalculationType {
	@Field(() => String)
	budgetBoxName!: string;

	@Field(() => ID)
	budgetBoxId!: string;

	@Field(() => CurrencyType)
	readonly currency!: CurrencyType;
}

@ObjectType()
export class BoxTransactionType {
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

	@Field(() => validTransactionTypeEnum)
	transactionType!: transactionType;

	@Field(() => validTransactionStatusEnum)
	transactionStatus!: transactionStatus;
	
	@Field(() => [TransactionCalculationType])
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

export default BoxTransactionType;

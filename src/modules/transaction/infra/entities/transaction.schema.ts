import {
	validTransactionStatusEnum, transactionStatus
} from "@modules/transaction/domain/transaction-status.value-object";
import { ICalculation, ICurrency, ITransaction } from "@modules/shared";
import {
	validTransactionTypeEnum,
	transactionType
} from "@modules/transaction/domain/transaction-type.value-object";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DomainEvents, DomainId } from "types-ddd";

export type TransactionDocument = Transaction & Document;

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class Transaction implements ITransaction {
	@Prop({ immutable: true, required: true, type: String, index: true, unique: true })
	readonly id!: string;

	@Prop({ immutable: true, required: true, type: String, index: true })
	readonly userId!: string;
	
	@Prop({ immutable: true, required: true, type: String })
	readonly reason!: string;
	
	@Prop({ immutable: true, required: true, type: Date })
	readonly paymentDate!: Date;
	
	@Prop({ immutable: true, required: true, type: String, enum:validTransactionTypeEnum, index: true })
	transactionType!: transactionType;
	
	@Prop({ immutable: true, required: true, type: String, enum:validTransactionStatusEnum, index: true })
	status!: transactionStatus;

	@Prop({ immutable: true, required: true, type: Object })
	readonly totalValue?: ICurrency;
	
	@Prop({type: [{ immutable: true, type: Object }], immutable: true, required: true })
	readonly transactionCalculations!: readonly ICalculation[];
	
	@Prop({ type: String, default: null })
	note!: string | null;
	
	@Prop({ type: String, default: null })
	attachment!: string | null;
	
	@Prop({ type: Date, required: true, default: new Date() })
	readonly createdAt!: Date;

	@Prop({ type: Date, required: true, default: new Date() })
	updatedAt!: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// Execute hooks after create transaction on database
TransactionSchema.post('save', (model: Transaction) => {
	const id = DomainId.create(model.id);
	DomainEvents.dispatchEventsForAggregate(id.value);
});

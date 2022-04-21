import { IBudgetBox, IReason } from "@shared/index";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BudgetBoxDocument = BudgetBox & Document;

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class BudgetBox implements IBudgetBox {

	@Prop({ immutable: true, required: true, type: String, index: true })
	readonly id!: string;

	@Prop({ required: true, type: String, index: true })
	ownerId!: string;

	@Prop({ required: true, type: String })
	description!: string;

	@Prop({ required: true, type: Number })
	balanceAvailable!: number;

	@Prop({ required: true, type: Boolean })
	isPercentage!: boolean;

	@Prop({ required: true, type: Number })
	budgetPercentage!: number;

	@Prop({ type: [{ type: Object }], default: [], required: true })
	reasons!: IReason[];

	@Prop({ type: Date, required: true, default: new Date() })
	createdAt!: Date;

	@Prop({ type: Date, required: true, default: new Date() })
	updatedAt!: Date;
}

export const BudgetBoxSchema = SchemaFactory.createForClass(BudgetBox);
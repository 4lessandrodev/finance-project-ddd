import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Terms interface

export interface IUserAgent {
	name: string;
	version: string;
	os: string;
	type: string;
}

export interface Term {
	ip: string;
	acceptedAt: Date;
	userAgent: IUserAgent;
}

export type UserDocument = User & Document;

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class User {
	@Prop({ immutable: true, required: true, type: String, index: true })
	readonly id!: string;

	@Prop({ required: true, index: true, type: String })
	email!: string;

	@Prop({ type: String, required: true })
	password!: string;

	@Prop({ type: Array, required: true })
	terms!: Array<Term>;

	@Prop({ type: Date, required: true, default: new Date() })
	createdAt!: Date;

	@Prop({ type: Date, required: true, default: new Date() })
	updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

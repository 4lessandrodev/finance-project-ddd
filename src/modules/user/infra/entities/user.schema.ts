import { IUser, ITerm } from '@shared/index';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class User implements IUser {

	@Prop({ immutable: true, required: true, type: String, index: true, unique: true })
	readonly id!: string;

	@Prop({ required: true, index: true, type: String, unique: true })
	email!: string;

	@Prop({ type: String, required: true })
	password!: string;

	@Prop({ type: Array, required: true })
	terms!: Array<ITerm>;

	@Prop({ type: Date, required: true, default: new Date() })
	createdAt!: Date;

	@Prop({ type: Date, required: true, default: new Date() })
	updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

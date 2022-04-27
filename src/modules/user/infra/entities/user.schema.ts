import { IUser, ITerm } from '@shared/index';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DomainEvents, DomainId } from 'types-ddd';

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

	@Prop({ type: Boolean, default: false })
	isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);


// execute hooks on delete user account
UserSchema.post('remove', function (doc: IUser){
	const id = DomainId.create(doc.id);
	DomainEvents.dispatchEventsForAggregate(id.value);
});

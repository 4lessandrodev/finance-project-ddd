import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { systemTypes } from '@domain/user/value-objects';
import { Document } from 'mongoose';

// Terms interface

export interface IUserAgent {
  name: string;
  version: string;
  os: systemTypes;
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

  @Prop({ type: Array, default: [] })
  budgetBoxIds!: string[];

  @Prop({ type: Number, required: true, default: 0 })
  totalBalanceAvailable!: number;

  @Prop({ type: Array, required: true })
  terms!: Array<Term>;

  @Prop({ type: Date, required: true, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, required: true, default: new Date() })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

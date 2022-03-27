import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReasonType {

	@Field(() => ID)
	id!: string;

	@Field(() => String)
	description!: string;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;

}

export default ReasonType;

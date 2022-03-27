import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TermType } from "./term.type";

@ObjectType()
export class UserType {

	@Field(() => ID)
	id!: string;

	@Field(() => [TermType], { nullable: true })
	terms!: TermType[];

	@Field(() => String)
	email!: string;
}

export default UserType;

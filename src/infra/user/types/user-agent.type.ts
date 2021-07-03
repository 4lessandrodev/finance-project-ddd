import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

@ObjectType()
export class UserAgentType {
	@Field(() => String)
	name!: string;

	@Field(() => String)
	version!: string;

	@Field(() => String)
	os!: string;

	@Field(() => String)
	type!: string;
}
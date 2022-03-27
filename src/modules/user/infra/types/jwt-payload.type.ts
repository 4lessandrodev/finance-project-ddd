import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class JwtPayloadType {

	@Field(() => String)
	token!: string;

}

export default JwtPayloadType;

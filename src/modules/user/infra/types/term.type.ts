import { Field, ObjectType } from "@nestjs/graphql";
import { UserAgentType } from "./user-agent.type";

@ObjectType()
export class TermType {
	@Field(() => String)
	ip!: string;

	@Field(() => String)
	acceptedAt!: Date;

	@Field(() => UserAgentType)
	userAgent!: UserAgentType;
}

export default TermType;

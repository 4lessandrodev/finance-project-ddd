import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
	@Field(() => String!)
	email!: string;

	@Field(() => String!)
	password!: string;

	@Field(() => String!)
	ip!: string;

	@Field(() => Boolean!)
	acceptedTerms!: boolean;
}
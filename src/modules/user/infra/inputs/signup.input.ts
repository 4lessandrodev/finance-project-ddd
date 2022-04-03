import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
	@Field(() => String)
	email!: string;

	@Field(() => String)
	password!: string;

	@Field(() => Boolean)
	acceptedTerms!: boolean;
}

export default SignupInput;

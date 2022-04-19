import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SigninInput {
	
	@Field(() => String)
	email!: string;

	@Field(() => String)
	password!: string;

}

export default SigninInput;

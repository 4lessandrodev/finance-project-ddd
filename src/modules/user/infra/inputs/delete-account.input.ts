import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteUserAccountInput {

	@Field(() => String)
	password!: string;

}

export default DeleteUserAccountInput;

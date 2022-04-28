import { JWTPayload } from '@modules/user/application/use-cases/signin/jwt-payload.interface';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";;
import { SignupInput } from '@modules/user/infra/inputs/signup.input';
import { SigninInput } from '@modules/user/infra/inputs/signin.input';
import { GetUserAgent } from '@modules/user/infra/services/decorators/get-user-agent.decorator';
import { JwtAuthGuard } from '@modules/user/infra/services/guards/jwt-auth.guard';
import { JwtPayloadType } from '@modules/user/infra/types/jwt-payload.type';
import { UserAgentType } from '@modules/user/infra/types/user-agent.type';
import { UserType } from "@modules/user/infra/types/user.type";
import { UserService } from '@modules/user/infra/user.service';
import { GetUserId } from '@modules/user/infra/services/decorators/get-user.decorator';
import { GetUserIp } from '@modules/user/infra/services/decorators/get-ip.decorator';
import DeleteUserAccountInput from '@modules/user/infra/inputs/delete-account.input';

@Resolver(() => UserType)
export class UserResolver {
	constructor (
		@Inject(UserService)
		private readonly userService: UserService
	) { }

	@Query(() => UserType, { nullable: true })
	@UseGuards(JwtAuthGuard)
	async whoAmI (
		@GetUserId() userId: string
	): Promise<UserType | null> {
		
		const user = await this.userService.getAuthUser(userId);

		return user;
	}

	@Mutation(() => Boolean)
	async signup (
		@Args(SignupInput.name) user: SignupInput,
		@GetUserAgent() userAgent: UserAgentType,
		@GetUserIp() ip: string
	): Promise<boolean> {
		const success = true;
		
		await this.userService.signup({
			...user,
			term:
			{
				ip,
				acceptedAt: new Date(),
				userAgent
			}
		});
		return success;
	};

	@Mutation(()=> JwtPayloadType)
	async signin (
		@Args(SigninInput.name) args: SigninInput
	): Promise<JWTPayload>{
		return this.userService.signin(args);
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async deleteUserAccount (
		@GetUserId() userId: string,
		@Args(DeleteUserAccountInput.name) args: DeleteUserAccountInput
	): Promise<boolean>{
		const isSuccess = true;
		
		await this.userService.deleteAccount({ ...args, userId });

		return isSuccess;
	}
}

export default UserResolver;

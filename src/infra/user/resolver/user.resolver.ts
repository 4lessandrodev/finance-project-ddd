import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { SignupInput } from '../inputs/signup.input';
import { GetUserAgent } from '../services/decorators/get-useragent.decorator';
import { JwtAuthGuard } from '../services/guards/jwt-auth.guard';
import { UserAgentType } from '../types/user-agent.type';
import { UserType } from "../types/user.type";
import { UserService } from '../user.service';

@Resolver(() => UserType)
export class UserResolver {
	constructor (
		@Inject(UserService)
		private readonly userService: UserService
	) { }

	@Query(() => [UserType])
	@UseGuards(JwtAuthGuard)
	async users (): Promise<UserType[]> {

		const user = new UserType();
		user.email = 'valid_email@domain.com';
		user.id = 'ab535163-6924-420f-80b4-5a01674c51ea';
		user.terms = [];
		user.terms.push({
			acceptedAt: new Date(),
			ip: '123.123.123.123',
			userAgent: {
				name: 'firefox',
				os: 'LINUX',
				type: 'browser',
				version: '86.01'
			}
		});

		return [user];
	}

	@Mutation(() => Boolean)
	async signup (
		@Args(SignupInput.name) user: SignupInput,
		@GetUserAgent() userAgent: UserAgentType): Promise<boolean> {
		const success = true;
		await this.userService.signup({
			...user,
			term:
			{
				acceptedAt: new Date(),
				ip: user.ip,
				userAgent
			}
		});
		return success;
	};
}

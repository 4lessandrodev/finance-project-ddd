import { JWTPayload } from '@modules/user/application/use-cases/signin/jwt-payload.interface';
import { SigninDto } from '@modules/user/application/use-cases/signin/signin.dto';
import { SigninUseCase } from '@modules/user/application/use-cases/signin/signin.use-case';
import { SignUpDto } from '@modules/user/application/use-cases/signup/signup.dto';
import { SignUpUseCase } from '@modules/user/application/use-cases/signup/signup.use-case';
import { CheckResultInterceptor } from '@utils/check-result.interceptor';
import { Inject, Injectable } from '@nestjs/common';
import GetUserByIdUseCase from '@modules/user/application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { IUser } from '@modules/shared';
import DeleteAccountUseCase from '../application/use-cases/delete-account/delete-account.use-case';
import DeleteAccountDto from '../application/use-cases/delete-account/delete-account.dto';

@Injectable()
export class UserService {

	constructor (
		@Inject(SignUpUseCase)
		private readonly signupUseCase: SignUpUseCase,

		@Inject(SigninUseCase)
		private readonly signinUseCase: SigninUseCase,

		@Inject(GetUserByIdUseCase)
		private readonly getUserByIdUseCase: GetUserByIdUseCase,

		@Inject(DeleteAccountUseCase)
		private readonly deleteAccountUseCase: DeleteAccountUseCase
	) { }

	async getAuthUser (userId: string): Promise<IUser> {
		const result = await this.getUserByIdUseCase.execute({ userId });
		CheckResultInterceptor(result);
		return result.getResult();
	}
	
	async signup (dto: SignUpDto): Promise<void> {
		CheckResultInterceptor(await this.signupUseCase.execute(dto));
	}

	async signin (dto: SigninDto): Promise<JWTPayload> {
		const result = CheckResultInterceptor(await this.signinUseCase.execute(dto));
		return result.getResult();
	}

	async deleteAccount (dto: DeleteAccountDto): Promise<void> {
		const result = await this.deleteAccountUseCase.execute(dto);
		CheckResultInterceptor(result);
	}
}

export default UserService;

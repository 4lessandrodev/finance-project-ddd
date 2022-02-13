import { JWTPayload } from '@app/user/use-cases/signin/jwt-payload.interface';
import { SigninDto } from '@app/user/use-cases/signin/signin.dto';
import { SigninUseCase } from '@app/user/use-cases/signin/signin.use-case';
import { SignUpDto } from '@app/user/use-cases/signup/signup.dto';
import { SignUpUseCase } from '@app/user/use-cases/signup/signup.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { CheckResultInterceptor } from '@utils/check-result.interceptor';

@Injectable()
export class UserService {

	constructor (
		@Inject(SignUpUseCase)
		private readonly signupUseCase: SignUpUseCase,

		@Inject(SigninUseCase)
		private readonly signinUseCase: SigninUseCase
	) { }

	async signup (dto: SignUpDto): Promise<void> {
		CheckResultInterceptor(await this.signupUseCase.execute(dto));
	}

	async signin (dto: SigninDto): Promise<JWTPayload> {
		const result = CheckResultInterceptor(await this.signinUseCase.execute(dto));
		return result.getResult();
	}
}

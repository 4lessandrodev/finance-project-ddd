import { JWTPayload } from '@modules/user/application/use-cases/signin/jwt-payload.interface';
import { SigninDto } from '@modules/user/application/use-cases/signin/signin.dto';
import { SigninUseCase } from '@modules/user/application/use-cases/signin/signin.use-case';
import { SignUpDto } from '@modules/user/application/use-cases/signup/signup.dto';
import { SignUpUseCase } from '@modules/user/application/use-cases/signup/signup.use-case';
import { UserQueryService } from '@modules/user/infra/services/queries/user-query.service';
import { IUserQueryService } from '@modules/user/infra/services/queries/user-query.interface';
import { CheckResultInterceptor } from '@utils/check-result.interceptor';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

	constructor (
		@Inject(SignUpUseCase)
		private readonly signupUseCase: SignUpUseCase,

		@Inject(SigninUseCase)
		private readonly signinUseCase: SigninUseCase,

		@Inject(UserQueryService)
		private readonly queryService: IUserQueryService
	) { }

	get query (): IUserQueryService {
		return this.queryService;
	}
	
	async signup (dto: SignUpDto): Promise<void> {
		CheckResultInterceptor(await this.signupUseCase.execute(dto));
	}

	async signin (dto: SigninDto): Promise<JWTPayload> {
		const result = CheckResultInterceptor(await this.signinUseCase.execute(dto));
		return result.getResult();
	}

}

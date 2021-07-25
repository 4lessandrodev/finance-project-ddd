import { JWTPayload } from '@app/user/use-cases/signin/jwt-payload.interface';
import { SigninDto } from '@app/user/use-cases/signin/signin.dto';
import { SigninUseCase } from '@app/user/use-cases/signin/signin.use-case';
import { SignUpDto } from '@app/user/use-cases/signup/signup.dto';
import { SignUpUseCase } from '@app/user/use-cases/signup/signup.use-case';
import { Inject, Injectable, PreconditionFailedException } from '@nestjs/common';
import { Result } from 'types-ddd/dist';

@Injectable()
export class UserService {

	constructor (
		@Inject(SignUpUseCase)
		private readonly signupUseCase: SignUpUseCase,

		@Inject(SigninUseCase)
		private readonly signinUseCase: SigninUseCase
	) { }

	private validateResult(result: Result<any>): void {
		if (result.isFailure) {
			throw new PreconditionFailedException(result.error);
		}
	}

	async signup (dto: SignUpDto): Promise<void> {
		const result = await this.signupUseCase.execute(dto);
		this.validateResult(result);
	}

	async signin(dto: SigninDto): Promise<JWTPayload> {
		const result = await this.signinUseCase.execute(dto);
		this.validateResult(result);
		return result.getResult();
	}
}
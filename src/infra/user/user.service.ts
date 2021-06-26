import { SignUpDto } from '@app/user/use-cases/signup/signup.dto';
import { SignUpUseCase } from '@app/user/use-cases/signup/signup.use-case';
import { Inject, Injectable, PreconditionFailedException } from '@nestjs/common';
import { Result } from 'types-ddd';

@Injectable()
export class UserService {

	constructor (
		@Inject(SignUpUseCase)
		private readonly signupUseCase: SignUpUseCase
	) { }

	async signup (dto: SignUpDto): Promise<void> {
		const result = await this.signupUseCase.execute(dto);
		if (result.isFailure) {
			throw new PreconditionFailedException(result.error);
		}
	}
}
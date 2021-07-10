import { ErrorMessages } from '@shared-common/error-messages/messages';
import { IUseCase, Result } from 'types-ddd';
import { IUserRepository } from '@repo/user.repository.interface';
import { SigninDto } from './signin.dto';
import { Injectable, Inject } from '@nestjs/common';
import { EmailValueObject, PasswordValueObject } from '@domain/user/value-objects';

@Injectable()
export class SingninUseCase implements IUseCase<SigninDto, Result<void>>{
	constructor (
		@Inject('UserRepository')
		private readonly userRepo: IUserRepository
	) { }

	async execute (dto: SigninDto): Promise<Result<void>> {
		const { password, email } = dto;
		const emailOrError = EmailValueObject.create(email);
		const passwordOrError = PasswordValueObject.create(password);

		const hasError = Result.combine([emailOrError, passwordOrError]);

		if (hasError.isFailure) {
			return Result.fail<void>(hasError.error.toString());
		}

		const existsUserForEmail = await this.userRepo.exists({ email });

		if (!existsUserForEmail) {
			return Result.fail<void>(ErrorMessages.INVALID_CREDENTIALS);
		}

		console.log(this.userRepo);
		return Result.ok();
	};
}

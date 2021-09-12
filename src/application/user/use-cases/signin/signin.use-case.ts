import { ErrorMessages } from '@shared-common/error-messages/messages';
import { IUseCase, Result } from 'types-ddd';
import { IUserRepository } from '@repo/user.repository.interface';
import { SigninDto } from './signin.dto';
import { Injectable, Inject } from '@nestjs/common';
import { EmailValueObject, PasswordValueObject } from '@domain/user/value-objects';
import { JWTPayload } from './jwt-payload.interface';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class SigninUseCase implements IUseCase<SigninDto, Result<JWTPayload>>{
	constructor (
		@Inject('UserRepository')
		private readonly userRepo: IUserRepository,

		@Inject(JwtService)
		private readonly jwtService: JwtService
	) { }

	async execute (dto: SigninDto): Promise<Result<JWTPayload>> {
		
		const { password, email } = dto;
		const emailOrError = EmailValueObject.create(email);
		const passwordOrError = PasswordValueObject.create(password);

		const hasError = Result.combine([emailOrError, passwordOrError]);

		if (hasError.isFailure) {
			return Result.fail<JWTPayload>(hasError.error.toString());
		}

		try {
			const existsUserForEmail = await this.userRepo.exists({ email });

			if (!existsUserForEmail) {
				return Result.fail<JWTPayload>(ErrorMessages.INVALID_CREDENTIALS);
			}

			const user = await this.userRepo.findOne({email});

			const isValidPassword = await user?.password.comparePasswords(password);

			if (!isValidPassword) {
				return Result.fail<JWTPayload>(ErrorMessages.INVALID_CREDENTIALS);
			}

			const token =  this.jwtService.sign({userId: user?.id.toString()});

			return Result.ok<JWTPayload>({token});

		} catch (error) {

			return Result.fail<JWTPayload>('Internal Server Error on Signin Use Case');

		}
		
	};
}

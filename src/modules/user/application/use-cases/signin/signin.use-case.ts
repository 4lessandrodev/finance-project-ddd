import { ErrorMessages } from '@shared/common/error-messages/messages';
import { EmailValueObject, IUseCase, PasswordValueObject, Result } from 'types-ddd';
import { SigninDto } from './signin.dto';
import { Injectable, Inject } from '@nestjs/common';
import { JWTPayload } from './jwt-payload.interface';
import {JwtService} from '@nestjs/jwt';
import { IUserRepository } from '@modules/user/domain/interfaces/user.repository.interface';


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

		const hasError = Result.combine<unknown>([emailOrError, passwordOrError]);

		if (hasError.isFailure) {
			return Result.fail<JWTPayload>(hasError.errorValue());
		}

		try {
			const existsUserForEmail = await this.userRepo.exists({ email });

			if (!existsUserForEmail) {
				return Result.fail<JWTPayload>(ErrorMessages.INVALID_CREDENTIALS);
			}

			const user = await this.userRepo.findOne({email});

			const isValidPassword = user?.password.compare(password);

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
import { IUseCase, Result, DomainId, EmailValueObject } from 'types-ddd';
import { SignUpDto } from './signup.dto';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '@modules/user/domain/interfaces/user.repository.interface';
import { PasswordValueObject } from '@modules/user/domain/password.value-object';
import { DateValueObject } from '@modules/shared';
import { IpValueObject } from '@modules/user/domain/ip.value-object';
import { TermValueObject } from '@modules/user/domain/term.value-object';
import { UserAggregate } from '@modules/user/domain';

export class SignUpUseCase implements IUseCase<SignUpDto, Result<void, string>> {

	constructor (
		@Inject('UserRepository') private readonly userRepo: IUserRepository,
	) { }

	async execute (request: SignUpDto): Promise<Result<void>> {

		if (!request.acceptedTerms) {
			return Result.fail<void>('Terms must be accepted');
		}

		const emailOrError = EmailValueObject.create(request.email);
		const passwordOrError = PasswordValueObject.create(request.password);

		const acceptedAtOrError = DateValueObject.create(request.term.acceptedAt);
		const ipOrError = IpValueObject.create(request.term.ip);

		const hasErrorOnValueObjects = Result.combine<unknown>([
			emailOrError,
			passwordOrError,
			acceptedAtOrError,
			ipOrError,
		]);

		if (hasErrorOnValueObjects.isFailure) {
			return Result.fail<void>(hasErrorOnValueObjects.errorValue());
		}

		const acceptedAt = acceptedAtOrError.getResult();
		const ip = ipOrError.getResult();

		const termOrError = TermValueObject.create({
			acceptedAt,
			ip,
			userAgent: request.term.userAgent,
		});

		if (termOrError.isFailure) {
			return Result.fail(termOrError.error.toString());
		}

		const terms = [termOrError.getResult()];
		const password = passwordOrError.getResult();
		const email = emailOrError.getResult();
		await password.encryptPassword();

		const userOrError = UserAggregate.create({
			ID: DomainId.create(),
			email,
			password,
			terms,
		});

		if (userOrError.isFailure) {
			return Result.fail(userOrError.error.toString());
		}

		try {
			const userAlreadyExistForEmail = await this.userRepo.exists({
				email: request.email,
			});

			if (userAlreadyExistForEmail) {
				return Result.fail('User already exist for provided email');
			}

			const user = userOrError.getResult();

			await this.userRepo.save(user);

			return Result.success();
		} catch (error) {
			console.log(error);
			return Result.fail<void>('Internal Server Error on Signup Use Case');
		}
	}
}

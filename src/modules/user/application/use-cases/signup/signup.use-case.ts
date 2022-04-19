import { SignUpDto } from './signup.dto';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '@modules/user/domain/interfaces/user.repository.interface';
import { IpValueObject } from '@modules/user/domain/ip.value-object';
import { TermValueObject } from '@modules/user/domain/term.value-object';
import { UserAggregate } from '@modules/user/domain';
import {
	IUseCase,
	Result,
	DomainId,
	EmailValueObject,
	PasswordValueObject,
	DateValueObject
} from 'types-ddd';

export class SignUpUseCase implements IUseCase<SignUpDto, Result<void, string>> {

	constructor (
		@Inject('UserRepository') private readonly userRepo: IUserRepository,
	) { }
		
	async execute (request: SignUpDto): Promise<Result<void>> {
		try {
			
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
				isAccepted: request.acceptedTerms
			});

			if (termOrError.isFailure) {
				return Result.fail(termOrError.error);
			}

			const terms = [termOrError.getResult()];
			const password = passwordOrError.getResult();
			const email = emailOrError.getResult();
			password.encrypt();

			const userOrError = UserAggregate.create({
				ID: DomainId.create(),
				email,
				password,
				terms,
			});

			const userAlreadyExistForEmail = await this.userRepo.exists({
				email: request.email,
			});

			if (userAlreadyExistForEmail) {
				return Result.fail('User already exist for provided email', 'CONFLICT');
			}

			const user = userOrError.getResult();

			await this.userRepo.save(user);

			return Result.success();
		} catch (error) {
			return Result.fail<void>('Internal Server Error on Signup Use Case', 'INTERNAL_SERVER_ERROR');
		}
	}
}

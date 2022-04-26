import { IUserRepository } from '@modules/user/domain/interfaces/user.repository.interface';
import userRepositoryMock from '@modules/user/application/mocks/user-repository.mock';
import { SignUpDto } from './signup.dto';
import { SignUpUseCase } from './signup.use-case';

describe('signup.use-case', () => {

	let userRepo: IUserRepository = userRepositoryMock;

	beforeEach(() => {
		userRepo = userRepositoryMock;
		jest.spyOn(userRepo, 'exists').mockClear();
	});
	//

	interface dtoProps {
		acceptedTerms?: boolean,
		email?: string,
		password?: string,
		acceptedAt?: Date,
		ip?: string,
		name?: string,
		os?: string,
		type?: string,
		version?: string;
	}


	const makeDto = (props: dtoProps): SignUpDto => {
		return {
			acceptedTerms: props.acceptedTerms ?? true,
			email: props.email ?? 'valid_email@domain.com',
			password: props.password ?? 'valid_password',
			term: {
				acceptedAt: props.acceptedAt ?? new Date(),
				ip: props.ip ?? '123.123.123.123',
				userAgent: {
					name: props.name ?? 'firefox',
					os: props.os ?? 'Linux',
					type: props.type ?? 'browser',
					version: props.version ?? '86.1'
				}
			}
		};
	};

	it('should be defined', () => {
		const useCase = new SignUpUseCase(userRepo);
		expect(useCase).toBeDefined();
	});

	it('should return fails if do not accept the terms', async () => {
		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute(makeDto({ acceptedTerms: false }));
		expect(result.isFailure).toBe(true);
	});

	it('should fails if user already exists for provided email', async () => {
		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(true);

		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute(makeDto(
			{ email: 'exists_email@domain.com' }
		));
		expect(result.isFailure).toBe(true);
	});

	it('should save user with success', async () => {
		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(false);

		const saved = jest.spyOn(userRepo, 'save');
		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute(makeDto(
			{ email: 'valid_email@domain.com' }
		));

		expect(result.isSuccess).toBe(true);
		expect(saved).toBeCalled();
	});

	it('should fail use case throws', async () => {
		jest.spyOn(userRepo, 'exists').mockImplementation(async () => {
			throw new Error("internal server error");
		});

		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute(makeDto({}));

		expect(result.isFailure).toBe(true);
		expect(result.error).toBe('Internal Server Error on Signup Use Case');
	});

	it('should fail if provide an invalid email', async () => {
		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(false);

		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute(makeDto(
			{ email: 'invalid_email' }
		));

		expect(result.isFailure).toBe(true);
	});

});

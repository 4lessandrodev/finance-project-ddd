import { IUserRepository } from '@repo/user.repository.interface';
import { SignUpDto } from './signup.dto';
import { SignUpUseCase } from './signup.use-case';

describe('signup.use-case', () => {

	let userRepo: IUserRepository;

	beforeEach(() => {
		userRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};
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

	it('should return fails if not accept the terms', async () => {
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
});

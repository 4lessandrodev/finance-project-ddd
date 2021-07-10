import { IUserRepository } from '@repo/user.repository.interface';
import { SingninUseCase } from './signin.use-case';

describe('signin.use-case', () => {
	/*
		verificar se foi informado um email (valido?) Ok
		verificar se foi informado uma senha (valido?) Ok
		verificar se existe usuário com o email informado Ok
		verificar se a senha do banco de dados corresponde a senha informada
		retornar resultado com erro ou token
	*/

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

	it('signin.use-case should be defined', () => {
		const useCase = new SingninUseCase(userRepo);
		expect(useCase).toBeDefined();
	});

	it('should return fail if not provide a valid email', async () => {
		const useCase = new SingninUseCase(userRepo);
		const result = await useCase.execute({
			email: 'invalid_email',
			password: 'valid_password'
		});
		expect(result.isFailure).toBe(true);
	});

	it('should return fail if not provide a valid password', async () => {
		const useCase = new SingninUseCase(userRepo);
		const result = await useCase.execute({
			email: 'valid_email@domain.com',
			password: ''
		});
		expect(result.isFailure).toBe(true);
	});

	it('should return fail if not exists user for provided email', async () => {
		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(false);

		const useCase = new SingninUseCase(userRepo);
		const result = await useCase.execute({
			email: 'not_exists@domain.com',
			password: 'valid_password'
		});
		expect(result.isFailure).toBe(true);
	});

});

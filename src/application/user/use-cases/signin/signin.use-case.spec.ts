import { IUserRepository } from '@repo/user.repository.interface';
import { SigninUseCase } from './signin.use-case';
import {UserAggregate} from '@domain/user/aggregates';
import {EmailValueObject, PasswordValueObject} from '@domain/user/value-objects'

describe('signin.use-case', () => {
	/*
		verificar se foi informado um email (valido?) Ok
		verificar se foi informado uma senha (valido?) Ok
		verificar se existe usuário com o email informado Ok
		verificar se a senha do banco de dados corresponde a senha informada - Ok
		retornar resultado com erro ou token
	*/

	let userRepo: IUserRepository;
	let user: UserAggregate;

	beforeAll(()=>{
		user = UserAggregate.create({
			email: EmailValueObject.create('valid_email@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			terms:[]
		}).getResult()
	});

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
		const useCase = new SigninUseCase(userRepo);
		expect(useCase).toBeDefined();
	});

	it('should return fail if not provide a valid email', async () => {
		const useCase = new SigninUseCase(userRepo);
		const result = await useCase.execute({
			email: 'invalid_email',
			password: 'valid_password'
		});
		expect(result.isFailure).toBe(true);
	});

	it('should return fail if not provide a valid password', async () => {
		const useCase = new SigninUseCase(userRepo);
		const result = await useCase.execute({
			email: 'valid_email@domain.com',
			password: ''
		});
		expect(result.isFailure).toBe(true);
	});

	it('should return fail if not exists user for provided email', async () => {
		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(false);

		const useCase = new SigninUseCase(userRepo);
		const result = await useCase.execute({
			email: 'not_exists@domain.com',
			password: 'valid_password'
		});
		expect(result.isFailure).toBe(true);
	});

	it('should return fail if provided password does not match', async ()=>{
		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(true);
		jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(user);

		const useCase = new SigninUseCase(userRepo);

		const result = await useCase.execute({email: 'valid_email@domain.com', password: 'invalid_password'});
		console.log(result)
		expect(result.isFailure).toBe(true);
	})

});

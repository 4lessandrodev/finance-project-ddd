import { IUserRepository } from '@repo/user.repository.interface';
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
	it('should be defined', () => {
		const useCase = new SignUpUseCase(userRepo);
		expect(useCase).toBeDefined();
	});
});

import { SigninUseCase } from './signin.use-case';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '@modules/user/domain/interfaces/user.repository.interface';
import { UserAggregate } from '@modules/user/domain';
import UserMock from '@modules/user/domain/tests/mock/user.mock';
import userRepositoryMock from '@modules/user/application/mocks/user-repository.mock';


describe('signin.use-case', () => {

	let userRepo: IUserRepository;
	let user: UserAggregate;
	let fakeJwt: JwtService;
	let useCase: SigninUseCase;

	beforeAll(() => {

		const userMock = new UserMock();

		fakeJwt = {
			sign: jest.fn()
		} as unknown as JwtService;


		user = userMock.domain().getResult();

	});

	beforeEach(() => {

		userRepo = userRepositoryMock;

		useCase = new SigninUseCase(userRepo, fakeJwt);

	});

	it('signin.use-case should be defined', () => {
		expect(useCase).toBeDefined();
	});

	it('should return fail if not provide a valid email', async () => {
		const result = await useCase.execute({
			email: 'invalid_email',
			password: 'valid_password'
		});
		expect(result.isFailure).toBe(true);
	});

	it('should return fail if not provide a valid password', async () => {
		const result = await useCase.execute({
			email: 'valid_email@domain.com',
			password: ''
		});
		expect(result.isFailure).toBe(true);
	});

	it('should return fail if not exists user for provided email', async () => {
		jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(null);

		const result = await useCase.execute({
			email: 'not_exists@domain.com',
			password: 'valid_password'
		});
		expect(result.isFailure).toBe(true);
	});

	it('should return fail if provided password does not match', async () => {
		jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(user);

		const result = await useCase.execute({ email: 'valid_email@domain.com', password: 'invalid_password' });
		expect(result.isFailure).toBe(true);
	});

	it('should return token payload if provide a valid password', async () => {
		jest.spyOn(userRepo, 'findOne').mockResolvedValueOnce(user);
		jest.spyOn(fakeJwt, 'sign').mockReturnValueOnce('valid_token');

		const result = await useCase.execute({ email: 'valid_email@domain.com', password: 'valid_password' });
		expect(result.isSuccess).toBe(true);
		expect(result.getResult()).toEqual({ token: "valid_token" });
	});

	it('should return internal server error if use case throws', async () => {

		jest.spyOn(userRepo, 'findOne').mockImplementationOnce(async () => {
			throw new Error("internal server error");
		});
		
		const result = await useCase.execute({ email: 'valid_email@domain.com', password: 'valid_password' });

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error on Signin Use Case');
	});

});

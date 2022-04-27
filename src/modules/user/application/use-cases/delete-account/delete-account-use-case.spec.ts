import { IUserRepository } from "@modules/user/domain/interfaces/user.repository.interface";
import userRepositoryMock from "@modules/user/application/mocks/user-repository.mock";
import DeleteAccountUseCase from "./delete-account.use-case";
import UserMock from "@modules/user/domain/tests/mock/user.mock";

describe("delete-account.use-case", () => {

	let repo: IUserRepository;
	const userMock = new UserMock();

	beforeEach(() => {
		repo = userRepositoryMock;
	});

	it('should delete account with success', async () => {

		const domain = userMock.domain({ password: 'valid_pass' }).getResult();

		jest.spyOn(repo, 'findOne').mockResolvedValueOnce(domain);

		const useCase = new DeleteAccountUseCase(repo);

		const result = await useCase.execute({ userId: 'valid_id', password: 'valid_pass' });

		expect(result.isSuccess).toBeTruthy();
	});

	it('should fails if user does not exists', async () => {

		jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

		const useCase = new DeleteAccountUseCase(repo);

		const result = await useCase.execute({
			userId: 'valid_id',
			password: 'valid_pass'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('User Not Found');
	});


	it('should fails if password does not match', async () => {
		const domain = userMock.domain({ password: 'invalid_pass' }).getResult();

		jest.spyOn(repo, 'findOne').mockResolvedValueOnce(domain);

		const useCase = new DeleteAccountUseCase(repo);

		const result = await useCase.execute({
			userId: 'valid_id',
			password: 'valid_pass'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Invalid Credentials');
	});

	it('should fails repository throws', async () => {

		jest.spyOn(repo, 'findOne').mockImplementationOnce(async ()=> {
			throw new Error("error");
		});

		const useCase = new DeleteAccountUseCase(repo);

		const result = await useCase.execute({
			userId: 'valid_id',
			password: 'valid_pass'
		});

		expect(result.isFailure).toBeTruthy();
		expect(result.error).toBe('Internal Server Error On Delete Account Use Case');
	});
});

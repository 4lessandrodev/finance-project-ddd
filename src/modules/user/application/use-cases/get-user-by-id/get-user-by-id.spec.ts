import UserMock from "@modules/user/domain/tests/mock/user.mock";
import { IUserQueryService } from "@modules/user/infra/services/queries/user-query.interface";
import userQueryServiceMock from "@modules/user/application/mocks/user-query-service.mock";
import GetUserByIdUseCase from "./get-user-by-id.use-case";

describe('get-user-by-id.use-case', () => {

	const userMock = new UserMock();
	let fakeQueryService: IUserQueryService;

	beforeAll(() => {
		fakeQueryService = userQueryServiceMock;
	});

	
	it('should get user with success', async (): Promise<void> => {

		const userFound = userMock.model({ id: 'valid_user_id' });
		jest.spyOn(fakeQueryService, 'getUserById').mockResolvedValueOnce(userFound);
		
		const useCase = new GetUserByIdUseCase(fakeQueryService);
		const result = await useCase.execute({ userId: 'valid_user_id' });

		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult()).toEqual(userFound);
	});

	it('should return fails if user is not found', async (): Promise<void> => {

		jest.spyOn(fakeQueryService, 'getUserById').mockResolvedValueOnce(null);
		
		const useCase = new GetUserByIdUseCase(fakeQueryService);
		const result = await useCase.execute({ userId: 'invalid_user_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toEqual(404);
	});

	it('should return fails with internal server error if throws', async (): Promise<void> => {

		jest.spyOn(fakeQueryService, 'getUserById').mockImplementationOnce(
			async () => {
				throw new Error("error simulation");
			}
		);
		
		const useCase = new GetUserByIdUseCase(fakeQueryService);
		const result = await useCase.execute({ userId: 'invalid_user_id' });

		expect(result.isFailure).toBeTruthy();
		expect(result.statusCodeNumber).toEqual(500);
		expect(result.error).toEqual('Internal Server Error on Get Authenticated User UseCase');
	});
});

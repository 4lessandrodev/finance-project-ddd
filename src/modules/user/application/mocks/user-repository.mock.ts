import { IUserRepository } from "@modules/user/domain/interfaces/user.repository.interface";

export const userRepositoryMock: IUserRepository = {
	delete: jest.fn(),
	exists: jest.fn(),
	find: jest.fn(),
	findOne: jest.fn(),
	save: jest.fn(),
};

export default userRepositoryMock;

import { IUserQueryService } from "@modules/user/infra/services/queries/user-query.interface";

export const userQueryServiceMock: IUserQueryService = {
	getUserById: jest.fn()
};

export default userQueryServiceMock;

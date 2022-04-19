import { IUser } from "@modules/shared";

export interface IUserQueryService {
	getUserById(userId: string): Promise<IUser | null>;
}

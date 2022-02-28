import { User } from "@modules/user/infra/entities/user.schema";

export interface IUserQueryService {
	getUserById(userId: string): Promise<User | null>;
}

import { IUser } from "@modules/shared";
import { IUserQueryService } from "@modules/user/infra/services/queries/user-query.interface";
import { Inject, Injectable } from "@nestjs/common";
import { IUseCase, Result } from "types-ddd";
import GetUserByIdDto from "./get-user-by-id.dto";

@Injectable()
export class GetUserByIdUseCase implements IUseCase<GetUserByIdDto, Result<IUser, string>>{
	constructor (
		@Inject('UserQueryService')
		private readonly userQueryService: IUserQueryService
	){}
	async execute ({ userId }: GetUserByIdDto): Promise<Result<IUser, string>>{
		try {
			const userFound = await this.userQueryService.getUserById(userId);

			if (!userFound) {
				return Result.fail<IUser, string>('User Not Found', 'NOT_FOUND');
			}

			return Result.ok<IUser, string>(userFound);
		} catch (error) {
			return Result.fail<IUser, string>(
				'Internal Server Error on Get Authenticated User UseCase',
				'INTERNAL_SERVER_ERROR'
			);
		}
	};

}

export default GetUserByIdUseCase;

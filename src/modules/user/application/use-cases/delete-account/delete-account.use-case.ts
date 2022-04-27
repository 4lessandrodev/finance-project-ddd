import { IUserRepository } from "@modules/user/domain/interfaces/user.repository.interface";
import { Inject } from "@nestjs/common";
import { IUseCase, Result } from "types-ddd";
import Dto from "./delete-account.dto";

export class DeleteAccountUseCase implements IUseCase<Dto, Result<void>> {

	constructor (
		@Inject('UserRepository')
		private readonly userRepo: IUserRepository
	){}

	async execute ({ userId: id, password }: Dto) : Promise<Result<void, string >> {
		try {

			const userOrNull = await this.userRepo.findOne({ id });

			if (!userOrNull) {
				return Result.fail('User Not Found', 'NOT_FOUND');
			}

			const user = userOrNull;

			const passwordMatch = user.password.compare(password);

			if (!passwordMatch) {
				return Result.fail('Invalid Credentials', 'FORBIDDEN');
			}

			user.deleteAccount();

			await this.userRepo.delete({ id });

			return Result.success();

		} catch (error) {
			
			return Result.fail(
				'Internal Server Error On Delete Account Use Case', 'INTERNAL_SERVER_ERROR'
			);

		}
	};
}

export default DeleteAccountUseCase;

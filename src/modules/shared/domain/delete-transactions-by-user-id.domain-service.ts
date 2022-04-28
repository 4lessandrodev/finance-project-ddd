import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";
import { IDomainService } from "@modules/shared/interfaces/domain-service.interface";
import ITransactionConnection from "./transaction-connection.interface";

interface Dto {
	userId: string;
}

export class DeleteTransactionsByUserIdDomainService implements IDomainService<Dto, Result<boolean>>{
	constructor (
		@Inject('TransactionConnection')
		private readonly connection: ITransactionConnection
	) { }
	async execute ({ userId }: Dto): Promise<Result<boolean>> {
		try {

			const isSuccess = await this.connection.deleteTransactionByUserId(userId);

			if (!isSuccess) {
				return Result.fail('Could not delete transactions for user', 'GATEWAY_TIMEOUT');
			}
			
			return Result.success();

		} catch (error) {
			return Result.fail(
				`Internal Server Error On Delete Transactions By UserId Domain Service`, 'INTERNAL_SERVER_ERROR'
			);
		}
	}
}

export default DeleteTransactionsByUserIdDomainService;

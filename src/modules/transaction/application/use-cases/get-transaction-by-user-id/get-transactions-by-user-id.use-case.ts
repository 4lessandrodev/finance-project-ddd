import { ITransaction } from "@modules/shared";
import { ITransactionQueryService } from "@modules/transaction/infra/services/queries/transaction-query.interface";
import { Inject } from "@nestjs/common";
import { IUseCase, Result } from "types-ddd";
import Dto from "./get-transactions-by-user-id.dto";

export class GetTransactionsByUserIdUseCase implements IUseCase<Dto, Result<ITransaction[]>>{

	constructor (
		@Inject('TransactionQueryService')
		private readonly transactionQueryService: ITransactionQueryService
	){}

	async execute (dto: Dto) : Promise<Result<ITransaction[], string>> {
		try {

			const data = await this.transactionQueryService.getTransactionsByUserId(dto);

			return Result.ok(data);
		} catch (error) {
			return Result.fail(
				'Internal Server Error on Get Transactions By User Id UseCase',
				'INTERNAL_SERVER_ERROR'
			);
		}
	}
}
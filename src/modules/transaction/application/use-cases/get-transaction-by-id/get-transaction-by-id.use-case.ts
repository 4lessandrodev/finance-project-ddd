import { ITransactionQueryService } from "@modules/transaction/infra/services/queries/transaction-query.interface";
import { ITransaction } from "@modules/shared";
import { Inject } from "@nestjs/common";
import { IUseCase, Result } from "types-ddd";
import Dto from "./get-transaction-by-id.dto";

export class GetTransactionByIdUseCase implements IUseCase<Dto, Result<ITransaction>>{

	constructor (
		@Inject('TransactionQueryService')
		private readonly transactionQueryService: ITransactionQueryService
	){}

	async execute ({ userId, transactionId: id }: Dto) :Promise<Result<ITransaction, string>> {
		try {
			
			const transactionOrNull = await this.transactionQueryService.getTransactionById({ userId, id });

			if (!transactionOrNull) {
				return Result.fail('Transaction Not Found', 'NOT_FOUND');
			}

			return Result.ok(transactionOrNull);

		} catch (error) {
			return Result.fail(
				'Internal Server Error On Get Transaction By Id Use Case',
				'INTERNAL_SERVER_ERROR'
			);
		}
	};
}

export default GetTransactionByIdUseCase;

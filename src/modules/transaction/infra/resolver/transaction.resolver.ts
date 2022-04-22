import { Inject } from "@nestjs/common";
import { Mutation, Resolver } from "@nestjs/graphql";
import TransactionService from "@modules/transaction/infra/transaction.service";
import TransactionType from "@modules/transaction/infra/types/transaction.types";

@Resolver(() => TransactionType)
export class TransactionResolver { 

	constructor (
		@Inject(TransactionService)
		private readonly transactionService: TransactionService
	) { }

	@Mutation(() => Boolean)
	async capitalInflowPosting (): Promise<boolean> {
		return this.transactionService.capitalInflowPosting();
	}
}

export default TransactionResolver;

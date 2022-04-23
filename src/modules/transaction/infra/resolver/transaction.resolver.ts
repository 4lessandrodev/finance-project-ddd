import { Inject, UseGuards } from "@nestjs/common";
import { Args, Query, Mutation, Resolver } from "@nestjs/graphql";
import TransactionService from "@modules/transaction/infra/transaction.service";
import TransactionType from "@modules/transaction/infra/types/transaction.types";
import PercentageCapitalInflowPostingInput from "@modules/transaction/infra/inputs/percentage-capital-inflow-posting.input";
import { JwtAuthGuard } from "@modules/user/infra/services/guards/jwt-auth.guard";
import { GetUserId } from "@modules/user/infra/services/decorators/get-user.decorator";
import { ITransaction } from "@modules/shared";

@Resolver(() => TransactionType)
export class TransactionResolver { 

	constructor (
		@Inject(TransactionService)
		private readonly transactionService: TransactionService
	) { }

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async percentageCapitalInflowPosting (
		@GetUserId() userId: string,
		@Args(PercentageCapitalInflowPostingInput.name) args: PercentageCapitalInflowPostingInput
	): Promise<boolean> {
		const isSuccess = true;
		
		await this.transactionService.percentageCapitalInflowPosting({ ...args, userId });

		return isSuccess;
	}

	@Query(() => [TransactionType])
	@UseGuards(JwtAuthGuard)
	async getTransactions (
		@GetUserId() userId: string,
	): Promise<ITransaction[]> {
		return this.transactionService.getTransactions({ userId });
	}
}

export default TransactionResolver;

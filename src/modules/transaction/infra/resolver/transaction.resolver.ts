import { Inject, UseGuards } from "@nestjs/common";
import { Args, Query, Mutation, Resolver } from "@nestjs/graphql";
import TransactionService from "@modules/transaction/infra/transaction.service";
import BoxTransactionType from "@modules/transaction/infra/types/transaction.types";
import PercentageCapitalInflowPostingInput from "@modules/transaction/infra/inputs/percentage-capital-inflow-posting.input";
import { JwtAuthGuard } from "@modules/user/infra/services/guards/jwt-auth.guard";
import { GetUserId } from "@modules/user/infra/services/decorators/get-user.decorator";
import { ITransaction } from "@modules/shared";
import PostingToBenefitInput from "@modules/transaction/infra/inputs/posting-to-benefit.input";
import CreateExpenseInput from "@modules/transaction/infra/inputs/create-expense.input";
import GetTransactionByIdInput from "@modules/transaction/infra/inputs/get-transaction-by-id.input";
import BalanceTransferenceInput from "@modules/transaction/infra/inputs/balance-transference.input";

@Resolver(() => BoxTransactionType)
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

	@Query(() => [BoxTransactionType])
	@UseGuards(JwtAuthGuard)
	async getTransactions (
		@GetUserId() userId: string,
	): Promise<ITransaction[]> {
		return this.transactionService.getTransactions({ userId });
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async postingToBenefit (
		@GetUserId() userId: string,
		@Args(PostingToBenefitInput.name) args: PostingToBenefitInput
	): Promise<boolean> {
		const isSuccess = true;
		
		await this.transactionService.postingToBenefit({ ...args, userId });

		return isSuccess;
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async createExpense (
		@GetUserId() userId: string,
		@Args(CreateExpenseInput.name) args: CreateExpenseInput
	): Promise<boolean> {
		const isSuccess = true;
		
		await this.transactionService.createExpense({ ...args, userId });

		return isSuccess;
	}

	@Query(() => BoxTransactionType)
	@UseGuards(JwtAuthGuard)
	async getTransactionById (
		@GetUserId() userId: string,
		@Args(GetTransactionByIdInput.name) args: GetTransactionByIdInput
	): Promise<ITransaction> {
		return this.transactionService.getTransactionById({ ...args, userId });
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async transferBalance (
		@GetUserId() userId: string,
		@Args(BalanceTransferenceInput.name) args: BalanceTransferenceInput
	): Promise<boolean> {
		const isSuccess = true;
		
		await this.transactionService.balanceTransference({ ...args, userId });

		return isSuccess;
	}
}

export default TransactionResolver;

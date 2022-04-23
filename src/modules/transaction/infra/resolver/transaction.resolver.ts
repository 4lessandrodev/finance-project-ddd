import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import TransactionService from "@modules/transaction/infra/transaction.service";
import TransactionType from "@modules/transaction/infra/types/transaction.types";
import CapitalInflowPostingInput from "@modules/transaction/infra/inputs/capital-inflow-posting.input";
import { JwtAuthGuard } from "@modules/user/infra/services/guards/jwt-auth.guard";
import { GetUserId } from "@modules/user/infra/services/decorators/get-user.decorator";

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
		@Args(CapitalInflowPostingInput.name) args: CapitalInflowPostingInput
	): Promise<boolean> {
		const isSuccess = true;
		
		await this.transactionService.percentageCapitalInflowPosting({ ...args, userId });

		return isSuccess;
	}
}

export default TransactionResolver;

import { GetUserId } from "@modules/user/infra/services/decorators/get-user.decorator";
import { JwtAuthGuard } from "@modules/user/infra/services/guards/jwt-auth.guard";
import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import BudgetBoxService from "@modules/budget-box/infra/budget-box.service";
import CreateBudgetBoxInput from "@modules/budget-box/infra/inputs/create-budget-box.input";
import BudgetBoxType from "@modules/budget-box/infra/types/budget-box.type";
import AddReasonToBudgetBoxInput from "@modules/budget-box/infra/inputs/add-reason-to-budget-box.input";

@Resolver(() => BudgetBoxType)
export class BudgetBoxResolver {
	constructor (
		@Inject(BudgetBoxService)
		private budgetBoxService: BudgetBoxService
	) { }
	
	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async createBudgetBox (
		@Args(CreateBudgetBoxInput.name) args: CreateBudgetBoxInput,
		@GetUserId() ownerId: string
	): Promise<boolean> {
		const isSuccess = true;

		await this.budgetBoxService.createBudgetBox({ ...args, ownerId });

		return isSuccess;
	}

	@Query(() => [BudgetBoxType])
	@UseGuards(JwtAuthGuard)
	async getBudgetBoxes (
		@GetUserId() ownerId: string
	): Promise<BudgetBoxType[]> {
		const result = await this.budgetBoxService.getBudgetBoxesForAuthUser({ ownerId });
		return result;
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async addReasonToBudgetBox (
		@Args(AddReasonToBudgetBoxInput.name) args: AddReasonToBudgetBoxInput,
		@GetUserId() ownerId: string
	): Promise<boolean> {
		const isSuccess = true;

		await this.budgetBoxService.addReasonToBudgetBox({ ...args, ownerId });

		return isSuccess;
	}
}

export default BudgetBoxResolver;

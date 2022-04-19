import { randomUUID } from "crypto";
import { GetUserId } from "@modules/user/infra/services/decorators/get-user.decorator";
import { JwtAuthGuard } from "@modules/user/infra/services/guards/jwt-auth.guard";
import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import BudgetBoxService from "@modules/budget-box/infra/budget-box.service";
import CreateBudgetBoxInput from "@modules/budget-box/infra/inputs/create-budget-box.input";
import BudgetBoxType from "@modules/budget-box/infra/types/budget-box.type";

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
	async getBudgetBoxes (): Promise<BudgetBoxType[]> {
		return [
			{
				id: randomUUID(),
				balanceAvailable: 200,
				budgetPercentage: 10,
				description: 'valid budget box',
				isPercentage: true,
				reasons: [],
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];
	}
}

export default BudgetBoxResolver;

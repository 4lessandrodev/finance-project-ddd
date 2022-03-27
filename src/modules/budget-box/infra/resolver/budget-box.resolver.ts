import { JwtAuthGuard } from "@modules/user/infra/services/guards/jwt-auth.guard";
import { Inject, UseGuards } from "@nestjs/common";
import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { randomUUID } from "crypto";
import BudgetBoxService from "../budget-box.service";
import BudgetBoxType from "../types/budget-box.type";

@Resolver(() => BudgetBoxType)
export class BudgetBoxResolver {
	constructor (
		@Inject(BudgetBoxService)
		private budgetBoxService: BudgetBoxService
	) { }
	
	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async createBudgetBox (): Promise<boolean> {
		const isSuccess = true;

		await this.budgetBoxService.createBudgetBox();

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

import { Inject, UseGuards } from "@nestjs/common";
import { GetUserId } from "@modules/user/infra/services/decorators/get-user.decorator";
import { JwtAuthGuard } from "@modules/user/infra/services/guards/jwt-auth.guard";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import BudgetBoxService from "@modules/budget-box/infra/budget-box.service";
import CreateBudgetBoxInput from "@modules/budget-box/infra/inputs/create-budget-box.input";
import BudgetBoxType from "@modules/budget-box/infra/types/budget-box.type";
import AddReasonToBudgetBoxInput from "@modules/budget-box/infra/inputs/add-reason-to-budget-box.input";
import GetBudgetBoxByIdInput from "@modules/budget-box/infra/inputs/budget-box-id.input";
import RemoveReasonFromBudgetBoxInput from "@modules/budget-box/infra/inputs/remove-reason-from-budget-box.input";
import ChangeReasonDescriptionBoxInput from "@modules/budget-box/infra/inputs/change-reason-description.input";
import ChangeBudgetBoxPercentageInput from "@modules/budget-box/infra/inputs/change-budget-percentage.input";
import ChangeBudgetBoxNameInput from "@modules/budget-box/infra/inputs/change-budget-box-name.input";
import DeleteBudgetBoxInput from "@modules/budget-box/infra/inputs/delete-budget-box.input";

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

	@Query(() => BudgetBoxType)
	@UseGuards(JwtAuthGuard)
	async getBudgetBoxById (
		@GetUserId() ownerId: string,
		@Args(GetBudgetBoxByIdInput.name) args: GetBudgetBoxByIdInput
	): Promise<BudgetBoxType> {
		const result = await this.budgetBoxService.getBudgetBoxById({ ...args, ownerId, });
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

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async removeReasonFromBudgetBox (
		@Args(RemoveReasonFromBudgetBoxInput.name) args: RemoveReasonFromBudgetBoxInput,
		@GetUserId() ownerId: string
	): Promise<boolean> {
		const isSuccess = true;

		await this.budgetBoxService.removeReasonFromBudgetBox({ ...args, ownerId });

		return isSuccess;
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async changeReasonDescription (
		@Args(ChangeReasonDescriptionBoxInput.name) args: ChangeReasonDescriptionBoxInput,
		@GetUserId() ownerId: string
	): Promise<boolean> {
		const isSuccess = true;

		await this.budgetBoxService.changeReasonDescription({ ...args, ownerId });

		return isSuccess;
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async changeBudgetPercentage (
		@Args(ChangeBudgetBoxPercentageInput.name) args: ChangeBudgetBoxPercentageInput,
		@GetUserId() ownerId: string
	): Promise<boolean> {
		const isSuccess = true;

		await this.budgetBoxService.changeBudgetBoxPercentage({ ...args, ownerId });

		return isSuccess;
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async changeBudgetName (
		@Args(ChangeBudgetBoxNameInput.name) args: ChangeBudgetBoxNameInput,
		@GetUserId() ownerId: string
	): Promise<boolean> {
		const isSuccess = true;

		await this.budgetBoxService.changeBudgetBoxName({ ...args, ownerId });

		return isSuccess;
	}

	@Mutation(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async deleteBudgetBox (
		@Args(DeleteBudgetBoxInput.name) args: DeleteBudgetBoxInput,
		@GetUserId() userId: string
	): Promise<boolean> {
		const isSuccess = true;

		await this.budgetBoxService.deleteBudgetBox({ ...args, userId });

		return isSuccess;
	}
}

export default BudgetBoxResolver;

import { Inject, Injectable } from "@nestjs/common";
import CreateBudgetBoxUseCase from "@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.use-case";
import { CreateBudgetBoxDto } from '@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.dto';
import CheckResultInterceptor from "@utils/check-result.interceptor";
import { BaseProxy, IBudgetBox } from "@modules/shared";
import GetBudgetBoxesForAuthUserUseCase from "@modules/budget-box/application/use-cases/get-budget-boxes-for-auth-user/get-budget-boxes-for-auth-user.use-case";
import GetBudgetBoxesForAuthUserDto from "@modules/budget-box/application/use-cases/get-budget-boxes-for-auth-user/get-budget-boxes-for-auth-user.dto";
import AddReasonToBudgetBoxUseCase from "@modules/budget-box/application/use-cases/add-reason-to-budget-box/add-reason-to-budget-box.use-case";
import AddReasonToBudgetBoxDto from "@modules/budget-box/application/use-cases/add-reason-to-budget-box/add-reason-to-budget-box.dto";
import GetBudgetBoxByIdUseCase from "@modules/budget-box/application/use-cases/get-budget-box-by-id/get-budget-box-by-id.use-case";
import GetBudgetBoxByIdDto from '@modules/budget-box/application/use-cases/get-budget-box-by-id/get-budget-box-by-id.dto';
import RemoveReasonFromBudgetBoxUseCase from "@modules/budget-box/application/use-cases/remove-reason-from-budget-box/remove-reason-from-budget-box.use-case";
import RemoveReasonDto from "@modules/budget-box/application/use-cases/remove-reason-from-budget-box/remove-reason-from-budget-box-dto";
import ChangeReasonDescriptionUseCase from "@modules/budget-box/application/use-cases/change-reason-description/change-reason-description.use-case";
import ChangeReasonDescriptionDto from "@modules/budget-box/application/use-cases/change-reason-description/change-reason-description.dto";
import ChangeBudgetBoxPercentageUseCase from "@modules/budget-box/application/use-cases/change-budget-box-percentage/change-budget-box-percentage.use-case";
import ChangeBudgetBoxPercentageDto from "@modules/budget-box/application/use-cases/change-budget-box-percentage/change-budget-box-percentage.dto";
import ChangeBudgetBoxNameUseCase from "@modules/budget-box/application/use-cases/change-budget-box-name/change-budget-box-name.use-case";
import ChangeBudgetBoxNameDto from "@modules/budget-box/application/use-cases/change-budget-box-name/change-budget-box-name.dto";
import CanAllocatePercentageToBudgetBoxDomainService from "@modules/budget-box/domain/services/can-allocate-percentage-to-budget-box.domain-service";
import CanChangeBudgetBoxPercentageDomainService from "@modules/budget-box/domain/services/can-change-budget-box-percentage.domain-service";
import DeleteBudgetBoxUseCase from "../application/use-cases/delete-budget-box/delete-budget-box.use-case";
import DeleteBudgetBoxDto from "../application/use-cases/delete-budget-box/delete-budget-box.dto";

@Injectable()
export class BudgetBoxService {
	constructor (
		@Inject(CreateBudgetBoxUseCase)
		private createBudgetBoxUseCase: CreateBudgetBoxUseCase,

		@Inject(CanAllocatePercentageToBudgetBoxDomainService)
		private readonly canAllocate: CanAllocatePercentageToBudgetBoxDomainService,
		
		@Inject(GetBudgetBoxesForAuthUserUseCase)
		private readonly getBudgetBoxesForAuthUserUseCase: GetBudgetBoxesForAuthUserUseCase,
		
		@Inject(AddReasonToBudgetBoxUseCase)
		private readonly addReasonToBudgetBoxUseCase: AddReasonToBudgetBoxUseCase,

		@Inject(GetBudgetBoxByIdUseCase)
		private readonly getBudgetBoxByIdUseCase: GetBudgetBoxByIdUseCase,

		@Inject(RemoveReasonFromBudgetBoxUseCase)
		private readonly removeReasonFromBudgetBoxUseCase: RemoveReasonFromBudgetBoxUseCase,

		@Inject(ChangeReasonDescriptionUseCase)
		private readonly changeReasonDescriptionUseCase: ChangeReasonDescriptionUseCase,

		@Inject(ChangeBudgetBoxPercentageUseCase)
		private readonly changeBudgetBoxPercentageUseCase: ChangeBudgetBoxPercentageUseCase,

		@Inject(CanChangeBudgetBoxPercentageDomainService)
		private readonly canChangeBudgetBoxPercentageDomainService: CanChangeBudgetBoxPercentageDomainService,

		@Inject(ChangeBudgetBoxNameUseCase)
		private readonly changeBudgetBoxNameUseCase: ChangeBudgetBoxNameUseCase,

		@Inject(DeleteBudgetBoxUseCase)
		private readonly deleteBudgetBoxUseCase: DeleteBudgetBoxUseCase
	) { }
	async createBudgetBox (dto: CreateBudgetBoxDto): Promise<void>{
		
		const proxy = new BaseProxy<CreateBudgetBoxDto, void>(this.canAllocate, this.createBudgetBoxUseCase);
		const result = await proxy.execute(dto);
		
		CheckResultInterceptor(result);
	}

	async getBudgetBoxesForAuthUser (dto: GetBudgetBoxesForAuthUserDto): Promise<IBudgetBox[]> {
		const result = await this.getBudgetBoxesForAuthUserUseCase.execute(dto);
		CheckResultInterceptor(result);
		return result.getResult();
	}

	async addReasonToBudgetBox (dto: AddReasonToBudgetBoxDto): Promise<void> {
		const result = await this.addReasonToBudgetBoxUseCase.execute(dto);
		CheckResultInterceptor(result);
	}

	async getBudgetBoxById (dto: GetBudgetBoxByIdDto): Promise<IBudgetBox>{
		const result = await this.getBudgetBoxByIdUseCase.execute(dto);
		CheckResultInterceptor(result);
		return result.getResult();
	}

	async removeReasonFromBudgetBox (dto:RemoveReasonDto): Promise<void> {
		const result = await this.removeReasonFromBudgetBoxUseCase.execute(dto);
		CheckResultInterceptor(result);
	}

	async changeReasonDescription (dto: ChangeReasonDescriptionDto): Promise<void> {
		const result = await this.changeReasonDescriptionUseCase.execute(dto);
		CheckResultInterceptor(result);
	}

	async changeBudgetBoxPercentage (dto: ChangeBudgetBoxPercentageDto): Promise<void> {
		
		const proxy = new BaseProxy<ChangeBudgetBoxPercentageDto, void>(
			this.canChangeBudgetBoxPercentageDomainService, this.changeBudgetBoxPercentageUseCase
		);
		const result = await proxy.execute(dto);
		
		CheckResultInterceptor(result);
	}

	async changeBudgetBoxName (dto: ChangeBudgetBoxNameDto): Promise<void> {
		const result = await this.changeBudgetBoxNameUseCase.execute(dto);
		CheckResultInterceptor(result);
	}

	async deleteBudgetBox (dto: DeleteBudgetBoxDto): Promise<void> {
		const result = await this.deleteBudgetBoxUseCase.execute(dto);
		CheckResultInterceptor(result);
	}
}

export default BudgetBoxService;

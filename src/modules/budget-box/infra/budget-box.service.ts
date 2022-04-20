import { Inject, Injectable } from "@nestjs/common";
import CreateBudgetBoxUseCase from "@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.use-case";
import { CreateBudgetBoxDto } from '@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.dto';
import CheckResultInterceptor from "@utils/check-result.interceptor";
import { BaseProxy, CanAllocatePercentageToBudgetBoxDomainService, IBudgetBox } from "@modules/shared";
import GetBudgetBoxesForAuthUserUseCase from "@modules/budget-box/application/use-cases/get-budget-boxes-for-auth-user/get-budget-boxes-for-auth-user.use-case";
import GetBudgetBoxesForAuthUserDto from "@modules/budget-box/application/use-cases/get-budget-boxes-for-auth-user/get-budget-boxes-for-auth-user.dto";

@Injectable()
export class BudgetBoxService {
	constructor (
		@Inject(CreateBudgetBoxUseCase)
		private createBudgetBoxUseCase: CreateBudgetBoxUseCase,

		@Inject(CanAllocatePercentageToBudgetBoxDomainService)
		private readonly canAllocate: CanAllocatePercentageToBudgetBoxDomainService,
		
		@Inject(GetBudgetBoxesForAuthUserUseCase)
		private readonly getBudgetBoxesForAuthUserUseCase:GetBudgetBoxesForAuthUserUseCase
	){}
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
}

export default BudgetBoxService;

import { Inject, Injectable } from "@nestjs/common";
import CreateBudgetBoxUseCase from "@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.use-case";
import { CreateBudgetBoxDto } from '@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.dto';
import CheckResultInterceptor from "@utils/check-result.interceptor";
import { BaseProxy, CanAllocatePercentageToBudgetBoxDomainService } from "@modules/shared";

@Injectable()
export class BudgetBoxService {
	constructor (
		@Inject(CreateBudgetBoxUseCase)
		private createBudgetBoxUseCase: CreateBudgetBoxUseCase,

		@Inject(CanAllocatePercentageToBudgetBoxDomainService)
		private readonly canAllocate:CanAllocatePercentageToBudgetBoxDomainService
	){}
	async createBudgetBox (dto: CreateBudgetBoxDto): Promise<void>{
		
		const proxy = new BaseProxy<CreateBudgetBoxDto, void>(this.canAllocate, this.createBudgetBoxUseCase);
		const result = await proxy.execute(dto);
		
		CheckResultInterceptor(result);
	}
}

export default BudgetBoxService;

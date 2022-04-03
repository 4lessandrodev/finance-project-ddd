import { Inject, Injectable } from "@nestjs/common";
import {
	CreateBudgetBoxUseCase
} from "@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.use-case";
import { CreateBudgetBoxDto } from '@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.dto';
import CheckResultInterceptor from "@utils/check-result.interceptor";

@Injectable()
export class BudgetBoxService {
	constructor (
		@Inject(CreateBudgetBoxUseCase)
		private createBudgetBoxUseCase: CreateBudgetBoxUseCase
	){}
	async createBudgetBox (dto: CreateBudgetBoxDto): Promise<void>{
		CheckResultInterceptor(await this.createBudgetBoxUseCase.execute(dto));
	}
}

export default BudgetBoxService;

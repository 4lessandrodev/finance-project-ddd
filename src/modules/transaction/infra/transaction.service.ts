import { Inject, Injectable } from "@nestjs/common";
import CheckResultInterceptor from "@utils/check-result.interceptor";
import CanCreateTransactionDomainService from "@modules/shared/domain/can-create-transaction.domain-service";
import { BaseProxy } from "@modules/shared";
import PercentageCapitalInflowPostingUseCase from "@modules/transaction/application/use-cases/percentage-capital-inflow-posting/percentage-capital-inflow-posting.use-case";
import PercentageCapitalInflowPostingDto from "@modules/transaction/application/use-cases/percentage-capital-inflow-posting/percentage-capital-inflow-posting.dto";

@Injectable()
export class TransactionService {
	
	constructor (
		@Inject(PercentageCapitalInflowPostingUseCase)
		private readonly percentageCapitalInflowPostingUseCase: PercentageCapitalInflowPostingUseCase,

		@Inject(CanCreateTransactionDomainService)
		private readonly canCreateTransactionDomainService: CanCreateTransactionDomainService
	){}

	async percentageCapitalInflowPosting (dto: PercentageCapitalInflowPostingDto) {
		const proxy = new BaseProxy(this.canCreateTransactionDomainService, this.percentageCapitalInflowPostingUseCase);
		const result = await proxy.execute(dto);
		CheckResultInterceptor(result);
	}
}

export default TransactionService;

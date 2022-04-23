import { Inject, Injectable } from "@nestjs/common";
import {
	CapitalInflowPostingUseCase
} from "@modules/transaction/application/use-cases/capital-inflow-posting/capital-inflow-posting.use-case";
import {
	CapitalInflowPostingDto
} from "@modules/transaction/application/use-cases/capital-inflow-posting/capital-inflow-posting.dto";
import CheckResultInterceptor from "@utils/check-result.interceptor";
import CanCreateTransactionDomainService from "@modules/shared/domain/can-create-transaction.domain-service";
import { BaseProxy } from "@modules/shared";

@Injectable()
export class TransactionService {
	
	constructor (
		@Inject(CapitalInflowPostingUseCase)
		private readonly capitalInflowPostingUseCase: CapitalInflowPostingUseCase,

		@Inject(CanCreateTransactionDomainService)
		private readonly canCreateTransactionDomainService: CanCreateTransactionDomainService
	){}

	async capitalInflowPosting (dto: CapitalInflowPostingDto) {
		const proxy = new BaseProxy(this.canCreateTransactionDomainService, this.capitalInflowPostingUseCase);
		const result = await proxy.execute(dto);
		CheckResultInterceptor(result);
	}
}

export default TransactionService;

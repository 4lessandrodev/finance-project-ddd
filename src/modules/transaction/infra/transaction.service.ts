import { Inject, Injectable } from "@nestjs/common";
import CheckResultInterceptor from "@utils/check-result.interceptor";
import CanCreateTransactionDomainService from "@modules/shared/domain/can-create-transaction.domain-service";
import { BaseProxy, ITransaction } from "@modules/shared";
import PercentageCapitalInflowPostingUseCase from "@modules/transaction/application/use-cases/percentage-capital-inflow-posting/percentage-capital-inflow-posting.use-case";
import PercentageCapitalInflowPostingDto from "@modules/transaction/application/use-cases/percentage-capital-inflow-posting/percentage-capital-inflow-posting.dto";
import { GetTransactionsByUserIdUseCase } from "../application/use-cases/get-transaction-by-user-id/get-transactions-by-user-id.use-case";
import GetTransactionsByUserIdDto from "../application/use-cases/get-transaction-by-user-id/get-transactions-by-user-id.dto";

@Injectable()
export class TransactionService {
	
	constructor (
		@Inject(PercentageCapitalInflowPostingUseCase)
		private readonly percentageCapitalInflowPostingUseCase: PercentageCapitalInflowPostingUseCase,

		@Inject(CanCreateTransactionDomainService)
		private readonly canCreateTransactionDomainService: CanCreateTransactionDomainService,

		@Inject(GetTransactionsByUserIdUseCase)
		private readonly getTransactionsByUserIdUseCase: GetTransactionsByUserIdUseCase
	){}

	async percentageCapitalInflowPosting (dto: PercentageCapitalInflowPostingDto) {
		const proxy = new BaseProxy(this.canCreateTransactionDomainService, this.percentageCapitalInflowPostingUseCase);
		const result = await proxy.execute(dto);
		CheckResultInterceptor(result);
	}

	async getTransactions (dto: GetTransactionsByUserIdDto): Promise<ITransaction[]>{
		const result = await this.getTransactionsByUserIdUseCase.execute(dto);
		CheckResultInterceptor(result);
		return result.getResult();
	}
}

export default TransactionService;

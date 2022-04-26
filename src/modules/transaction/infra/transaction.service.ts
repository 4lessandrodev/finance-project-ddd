import { Inject, Injectable } from "@nestjs/common";
import CheckResultInterceptor from "@utils/check-result.interceptor";
import CanCreateTransactionDomainService from "@modules/shared/domain/can-create-transaction.domain-service";
import { BaseProxy, ITransaction } from "@modules/shared";
import PercentageCapitalInflowPostingUseCase from "@modules/transaction/application/use-cases/percentage-capital-inflow-posting/percentage-capital-inflow-posting.use-case";
import PercentageCapitalInflowPostingDto from "@modules/transaction/application/use-cases/percentage-capital-inflow-posting/percentage-capital-inflow-posting.dto";
import { GetTransactionsByUserIdUseCase } from "@modules/transaction/application/use-cases/get-transaction-by-user-id/get-transactions-by-user-id.use-case";
import GetTransactionsByUserIdDto from "@modules/transaction/application/use-cases/get-transaction-by-user-id/get-transactions-by-user-id.dto";
import PostingToBenefitUseCase from "@modules/transaction/application/use-cases/posting-to-benefit/posting-to-benefit.use-case";
import CanCreateBenefit from "@modules/transaction/domain/services/can-create-benefit.proxy";
import PostingToBenefitDto from "@modules/transaction/application/use-cases/posting-to-benefit/posting-to-benefit.dto";
import CreateExpenseUseCase from "@modules/transaction/application/use-cases/create-expense/create-expense.use-case";
import CreateExpenseDto from "@modules/transaction/application/use-cases/create-expense/create-expense.dto";
import CanCreateExpense from "@modules/transaction/domain/services/can-create-expense.proxy";
import GetTransactionByIdUseCase from "@modules/transaction/application/use-cases/get-transaction-by-id/get-transaction-by-id.use-case";
import GetTransactionByIdDto from "@modules/transaction/application/use-cases/get-transaction-by-id/get-transaction-by-id.dto";
import CanTransfer from "@modules/transaction/domain/services/can-transfer.proxy";
import BalanceTransferenceUseCase from "@modules/transaction/application/use-cases/balance-transference/balance-transference.use-case";
import BalanceTransferenceDto from "@modules/transaction/application/use-cases/balance-transference/balance-transference.dto";

@Injectable()
export class TransactionService {
	
	constructor (
		@Inject(PercentageCapitalInflowPostingUseCase)
		private readonly percentageCapitalInflowPostingUseCase: PercentageCapitalInflowPostingUseCase,

		@Inject(CanCreateTransactionDomainService)
		private readonly canCreateTransactionDomainService: CanCreateTransactionDomainService,

		@Inject(GetTransactionsByUserIdUseCase)
		private readonly getTransactionsByUserIdUseCase: GetTransactionsByUserIdUseCase,

		@Inject(PostingToBenefitUseCase)
		private readonly postingToBenefitUseCase: PostingToBenefitUseCase,

		@Inject(CanCreateBenefit)
		private readonly canCreateBenefitPosting: CanCreateBenefit,

		@Inject(CreateExpenseUseCase)
		private readonly createExpenseUseCase: CreateExpenseUseCase,

		@Inject(CanCreateExpense)
		private readonly canCreateExpense: CanCreateExpense,

		@Inject(GetTransactionByIdUseCase)
		private readonly getTransactionByIdUseCase: GetTransactionByIdUseCase,

		@Inject(CanTransfer)
		private readonly canTransfer: CanTransfer,

		@Inject(BalanceTransferenceUseCase)
		private readonly balanceTransferenceUseCase: BalanceTransferenceUseCase
	){}

	async percentageCapitalInflowPosting (dto: PercentageCapitalInflowPostingDto): Promise<void> {
		const proxy = new BaseProxy<PercentageCapitalInflowPostingDto, void>(
			this.canCreateTransactionDomainService, this.percentageCapitalInflowPostingUseCase
		);
		const result = await proxy.execute(dto);
		CheckResultInterceptor(result);
	}

	async getTransactions (dto: GetTransactionsByUserIdDto): Promise<ITransaction[]>{
		const result = await this.getTransactionsByUserIdUseCase.execute(dto);
		CheckResultInterceptor(result);
		return result.getResult();
	}

	async postingToBenefit (dto: PostingToBenefitDto): Promise<void> {
		const proxy = new BaseProxy<PostingToBenefitDto, void>(
			this.canCreateBenefitPosting, this.postingToBenefitUseCase
		);
		const result = await proxy.execute(dto);
		CheckResultInterceptor(result);
	}

	async createExpense (dto: CreateExpenseDto): Promise<void> {
		const proxy = new BaseProxy<CreateExpenseDto, void>(this.canCreateExpense, this.createExpenseUseCase);
		const result = await proxy.execute(dto);
		CheckResultInterceptor(result);
	}

	async getTransactionById (dto: GetTransactionByIdDto): Promise<ITransaction>{
		const result = await this.getTransactionByIdUseCase.execute(dto);
		CheckResultInterceptor(result);
		return result.getResult();
	}

	async balanceTransference (dto: BalanceTransferenceDto): Promise<void> {
		const proxy = new BaseProxy(this.canTransfer, this.balanceTransferenceUseCase);
		const result = await proxy.execute(dto);
		CheckResultInterceptor(result);
	}
}

export default TransactionService;

import { BaseConnection, BudgetBoxConnection, SharedModule } from "@modules/shared";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Transaction, TransactionSchema } from "@modules/transaction/infra/entities/transaction.schema";
import TransactionCalculationToDomain from "@modules/transaction/infra/repo/transaction-calculation.mapper";
import TransactionToDomainMapper from "@modules/transaction/infra/repo/transaction.mapper";
import TransactionRepository from "@modules/transaction/infra/repo/transaction.repository";
import TransactionResolver from "@modules/transaction/infra/resolver/transaction.resolver";
import TransactionService from "@modules/transaction/infra/transaction.service";
import TransactionQueryService from "./services/queries/transaction-query.service";
import PercentageCapitalInflowPostingUseCase from "@modules/transaction/application/use-cases/percentage-capital-inflow-posting/percentage-capital-inflow-posting.use-case";
import CalculationDomainService from "@modules/transaction/domain/services/create-percentage-transaction-calculation.domain-service";
import { GetTransactionsByUserIdUseCase } from "@modules/transaction/application/use-cases/get-transaction-by-user-id/get-transactions-by-user-id.use-case";
import CreateBenefitCalculationDomainService from "@modules/transaction/domain/services/create-benefit-calculation.domain-service";
import PostingToBenefitUseCase from "@modules/transaction/application/use-cases/posting-to-benefit/posting-to-benefit.use-case";
import CanCreateBenefit from "@modules/transaction/domain/services/can-create-benefit.proxy";

@Module({
	imports: [
		BaseConnection,
		BudgetBoxConnection,
		SharedModule,
		MongooseModule.forFeature([
			{ name: Transaction.name, schema: TransactionSchema }
		])
	],
	providers: [
		TransactionResolver,
		TransactionCalculationToDomain,
		TransactionToDomainMapper,
		TransactionService,
		{
			provide: 'TransactionRepository',
			useClass: TransactionRepository
		},
		PercentageCapitalInflowPostingUseCase,
		{
			provide: 'CalculationDomainService',
			useClass: CalculationDomainService
		},
		{
			provide: 'TransactionQueryService',
			useClass: TransactionQueryService
		},
		{
			provide: 'CreateBenefitCalculationDomainService',
			useClass: CreateBenefitCalculationDomainService
		},
		GetTransactionsByUserIdUseCase,
		CreateBenefitCalculationDomainService,
		PostingToBenefitUseCase,
		CanCreateBenefit
	]
})
export class TransactionModule { }

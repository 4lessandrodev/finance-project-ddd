import { BaseConnection, BudgetBoxConnection, SharedModule } from "@modules/shared";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
	CapitalInflowPostingUseCase
} from "@modules/transaction/application/use-cases/capital-inflow-posting/capital-inflow-posting.use-case";
import { Transaction, TransactionSchema } from "@modules/transaction/infra/entities/transaction.schema";
import TransactionCalculationToDomain from "@modules/transaction/infra/repo/transaction-calculation.mapper";
import TransactionToDomainMapper from "@modules/transaction/infra/repo/transaction.mapper";
import TransactionRepository from "@modules/transaction/infra/repo/transaction.repository";
import TransactionResolver from "@modules/transaction/infra/resolver/transaction.resolver";
import TransactionService from "@modules/transaction/infra/transaction.service";
import CalculationDomainService from "@modules/transaction/domain/services/create-transaction-calculation.domain-service";

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
		CapitalInflowPostingUseCase,
		{
			provide: 'CalculationDomainService',
			useClass: CalculationDomainService
		}
	]
})
export class TransactionModule { }

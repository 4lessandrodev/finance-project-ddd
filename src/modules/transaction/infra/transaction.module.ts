import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Transaction, TransactionSchema } from "./entities/transaction.schema";
import TransactionCalculationToDomain from "./repo/transaction-calculation.mapper";
import TransactionToDomainMapper from "./repo/transaction.mapper";
import TransactionRepository from "./repo/transaction.repository";
import TransactionService from "./transaction.service";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Transaction.name, schema: TransactionSchema }
		])
	],
	providers: [
		TransactionCalculationToDomain,
		TransactionToDomainMapper,
		TransactionService,
		{
			provide: 'TransactionRepository',
			useClass: TransactionRepository
		}
	]
})
export class TransactionModule { }

import { Module } from "@nestjs/common";
import { MongoClient } from "mongodb";
import CanCreateTransactionDomainService from "@shared/domain/can-create-transaction.domain-service";
import UpdateBudgetBoxBalanceDomainService from "@shared/domain/update-budget-box-balance.domain-service";
import BudgetBoxConnection from "./connections/budget-box-connection";
import { BaseConnection } from "./connections/connection";
import DeleteTransactionsByUserIdDomainService from "../domain/delete-transactions-by-user-id.domain-service";
import DeleteBudgetBoxByUserIdDomainService from "../domain/delete-budget-box-by-user-id.domain-service";
import TransactionConnection from "./connections/transaction-connection";
import CalculateValueToUpdate from "../utils/calculate";

@Module({
	imports: [],
	providers: [
		{
			provide: BaseConnection,
			useFactory: async () => {
				const client = new BaseConnection();
				const conn = await client.instance();
				return conn;
			}
		},
		{
			provide: 'BudgetBoxConnection',
			useFactory: (conn: MongoClient)=> new BudgetBoxConnection(conn),
			inject:[BaseConnection]
		},
		{
			provide: 'TransactionConnection',
			useFactory: (conn: MongoClient)=> new TransactionConnection(conn),
			inject:[BaseConnection]
		},
		{
			provide: 'UpdateBudgetBoxBalanceDomainService',
			useClass: UpdateBudgetBoxBalanceDomainService
		},
		CanCreateTransactionDomainService,
		UpdateBudgetBoxBalanceDomainService,
		DeleteTransactionsByUserIdDomainService,
		DeleteBudgetBoxByUserIdDomainService,
		CalculateValueToUpdate
	],
	exports: [
		BaseConnection,
		'BudgetBoxConnection',
		'TransactionConnection',
		'UpdateBudgetBoxBalanceDomainService',
		CanCreateTransactionDomainService,
		UpdateBudgetBoxBalanceDomainService,
		DeleteTransactionsByUserIdDomainService,
		DeleteBudgetBoxByUserIdDomainService,
		CalculateValueToUpdate
	]
})
export class SharedModule { }

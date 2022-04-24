import { Module } from "@nestjs/common";
import { MongoClient } from "mongodb";
import CanCreateTransactionDomainService from "@shared/domain/can-create-transaction.domain-service";
import UpdateBudgetBoxBalanceDomainService from "@shared/domain/update-budget-box-balance.domain-service";
import BudgetBoxConnection from "./connections/budget-box-connection";
import { BaseConnection } from "./connections/connection";

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
			provide: 'UpdateBudgetBoxBalanceDomainService',
			useClass: UpdateBudgetBoxBalanceDomainService
		},
		CanCreateTransactionDomainService,
		UpdateBudgetBoxBalanceDomainService
	],
	exports: [
		BaseConnection,
		'BudgetBoxConnection',
		'UpdateBudgetBoxBalanceDomainService',
		CanCreateTransactionDomainService,
		UpdateBudgetBoxBalanceDomainService
	]
})
export class SharedModule { }

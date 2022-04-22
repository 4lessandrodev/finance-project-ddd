import { Module } from "@nestjs/common";
import { MongoClient } from "mongodb";
import CanChangeBudgetBoxPercentageDomainService from "@modules/shared/domain/can-change-budget-box-percentage.domain-service";
import CanAllocateBudgetBoxPercentageDomainService from "@modules/shared/domain/can-allocate-percentage-to-budget-box.domain-service";
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
		CanChangeBudgetBoxPercentageDomainService,
		CanAllocateBudgetBoxPercentageDomainService,
	],
	exports: [
		BaseConnection,
		'BudgetBoxConnection',
		CanChangeBudgetBoxPercentageDomainService,
		CanAllocateBudgetBoxPercentageDomainService
	]
})
export class SharedModule { }

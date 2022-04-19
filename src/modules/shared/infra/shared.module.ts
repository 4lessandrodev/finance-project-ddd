import { Module } from "@nestjs/common";
import { MongoClient } from "mongodb";
import CanAllocatePercentageToBudgetBoxDomainService from "../domain/can-allocate-percentage-to-budget-box.domain-service";
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
		CanAllocatePercentageToBudgetBoxDomainService
	],
	exports: [
		BaseConnection,
		'BudgetBoxConnection',
		CanAllocatePercentageToBudgetBoxDomainService
	]
})
export class SharedModule { }

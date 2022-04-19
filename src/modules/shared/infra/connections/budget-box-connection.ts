import { BUDGET_BOX_COLLECTION_NAME, DB_NAME } from "@config/env";
import { IBudgetBoxConnection } from "@modules/shared/domain/budget-box-connection.interface";
import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import {MongoClient} from 'mongodb';

export class BudgetBoxConnection implements IBudgetBoxConnection {
	constructor (
		private readonly connection: MongoClient
	) {}
	
	async findBudgetBoxesByUserId (ownerId: string): Promise<IBudgetBox[]> {
		
		const result = await this.connection.db(DB_NAME)
			.collection(BUDGET_BOX_COLLECTION_NAME).find({ ownerId }).toArray();
		
		return result as unknown as IBudgetBox[];
	}
}

export default BudgetBoxConnection;

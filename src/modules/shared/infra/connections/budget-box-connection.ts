import { BUDGET_BOX_COLLECTION_NAME, DB_NAME } from "@config/env";
import { IBudgetBoxConnection, IFilter } from "@modules/shared/domain/budget-box-connection.interface";
import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import {MongoClient} from 'mongodb';

export class BudgetBoxConnection implements IBudgetBoxConnection {
	constructor (
		private readonly connection: MongoClient
	) { }
	
	async findBudgetBoxByIdAndUserId ({ id, ownerId }: IFilter): Promise<IBudgetBox | null> {
		const budgetBox = await this.connection.db(DB_NAME)
			.collection(BUDGET_BOX_COLLECTION_NAME).findOne<IBudgetBox>({ id, ownerId });
		
		if (!budgetBox) {
			return null;
		}

		return budgetBox;
	}
	
	async findBudgetBoxesByUserId (ownerId: string): Promise<IBudgetBox[]> {
		
		const result = await this.connection.db(DB_NAME)
			.collection(BUDGET_BOX_COLLECTION_NAME).find<IBudgetBox>({ ownerId }).toArray();
		
		return result;
	}
	
}

export default BudgetBoxConnection;

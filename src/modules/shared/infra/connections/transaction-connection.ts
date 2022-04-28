import { DB_NAME, TRANSACTION_COLLECTION_NAME } from "@config/env";
import ITransactionConnection from "@modules/shared/domain/transaction-connection.interface";
import {MongoClient} from 'mongodb';

export class TransactionConnection implements ITransactionConnection {
	constructor (
		private readonly connection: MongoClient
	) { }

	async deleteTransactionByUserId (userId: string): Promise<boolean> {
		const result = await this.connection.db(DB_NAME)
			.collection(TRANSACTION_COLLECTION_NAME).deleteMany({ userId });
		
		return !!result.acknowledged;
	}

}

export default TransactionConnection;

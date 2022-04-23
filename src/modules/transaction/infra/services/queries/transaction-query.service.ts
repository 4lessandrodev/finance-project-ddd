import {
	Filter,
	ITransactionQueryService
} from "@modules/transaction/infra/services/queries/transaction-query.interface";
import { Transaction, TransactionDocument } from "@modules/transaction/infra/entities/transaction.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TransactionQueryService implements ITransactionQueryService {

	constructor (
		@InjectModel(Transaction.name) private readonly conn: Model<TransactionDocument>,
	) { }
	
	async getTransactionsByUserId ({ beforeDate, userId }: Filter): Promise<Transaction[]> {
		
		const date = beforeDate ? beforeDate : new Date();

		const transactions = await this.conn
			.find<Transaction>(
				{ userId, createdAt: { $lt: date } },
				{ _id: false, __v: false }
			)
			.sort({ createdAt: 'desc' })
			.limit(300);

		return transactions;
	}
}

export default TransactionQueryService;

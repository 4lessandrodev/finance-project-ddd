import { ITransaction } from "@modules/shared";
import ITransactionRepository from "@modules/transaction/domain/interfaces/transaction.repository.interface";
import TransactionAggregate from "@modules/transaction/domain/transaction.aggregate";
import { InjectModel } from "@nestjs/mongoose";
import { Filter } from "types-ddd";
import { Transaction, TransactionDocument } from "../entities/transaction.schema";
import { Model } from 'mongoose';
import { Inject, Injectable } from "@nestjs/common";
import TransactionToDomainMapper from "./transaction.mapper";

@Injectable()
export class TransactionRepository implements ITransactionRepository {

	constructor (
		@InjectModel(Transaction.name)
		private readonly conn: Model<TransactionDocument>,

		@Inject(TransactionToDomainMapper)
		private readonly mapper: TransactionToDomainMapper
	){}

	async find (filter: Filter<Partial<ITransaction>>): Promise<TransactionAggregate[]> {
		
		const documents = await this.conn.find({ ...filter }).exec();

		const aggregates = documents
			.map((doc) => this.mapper
				.map(doc).getResult());
		
		return aggregates;
	};

	async findOne (filter: Filter<Partial<ITransaction>>):Promise<TransactionAggregate | null> {
		const document = await this.conn.findOne({ ...filter }).exec();

		if (!document) {
			return null;
		}

		return this.mapper.map(document).getResult();
	};

	async delete (filter: Filter<Partial<ITransaction>>):Promise<void> {
		throw new Error("not implemented for " + filter);
	};

	async exists (filter: Filter<Partial<ITransaction>>): Promise<boolean> {
		
		const document = await this.conn.exists({ ...filter }).exec();
		
		return !!document;
	};

	async save (target: TransactionAggregate): Promise<void> {
		
		const document = target.toObject<ITransaction>();
		const id = document.id;

		const exists = await this.exists({ id });

		if (!exists) {
			const schema = new this.conn(document);
			await schema.save();
			return;
		}

		await this.conn.updateOne({ id }, document);
	};
}

export default TransactionRepository;

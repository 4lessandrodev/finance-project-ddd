import BudgetBoxAggregate from "@modules/budget-box/domain/budget-box.aggregate";
import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import { IBudgetBox } from "@shared/index";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Filter } from "types-ddd";
import { BudgetBox, BudgetBoxDocument } from "../entities/budget-box.schema";
import BudgetBoxToDomainMapper from "./budget-box.mapper";

@Injectable()
export class BudgetBoxRepository implements IBudgetBoxRepository {

	constructor (
		@InjectModel(BudgetBox.name) 
		private readonly conn: Model<BudgetBoxDocument>,

		@Inject(BudgetBoxToDomainMapper)
		private readonly toDomainMapper: BudgetBoxToDomainMapper
	){}

	find (filter: Filter<Partial<IBudgetBox>>):Promise<BudgetBoxAggregate[] | null> {
		throw new Error(`Method not implemented, ${filter}`);	
	};

	async findOne (filter: Filter<Partial<IBudgetBox>>) :Promise<BudgetBoxAggregate | null> {
		const found = await this.conn.findOne({ ...filter }).exec();

		if (!found) {
			return null;
		}

		const aggregate = this.toDomainMapper.map(found);

		return aggregate.getResult();
	};

	async delete (filter: Filter<Partial<IBudgetBox>>) : Promise<void> {
		const document = await this.conn.findOne({ ...filter });
		
		if (!document) {
			return;
		}

		await document.remove();
	};

	async exists (filter: Filter<Partial<IBudgetBox>>) : Promise<boolean> {
		const exists = await this.conn.exists({ ...filter }).exec();
		return !!exists;
	};

	async save (target: BudgetBoxAggregate): Promise<void> {
		
		const schema = target.toObject<IBudgetBox>();
		const budgetBox = new this.conn(schema);
		const id = schema.id;
		const exists = await this.exists({ id });

		if (!exists) {
			await budgetBox.save();
			return;
		}

		await this.conn.updateOne({ id }, schema);
	};

}

export default BudgetBoxRepository;

import BudgetBoxAggregate from "@modules/budget-box/domain/budget-box.aggregate";
import { IBudgetBoxRepository } from "@modules/budget-box/domain/interfaces/budget-box.repository.interface";
import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Filter } from "types-ddd";
import { BudgetBox, BudgetBoxDocument } from "../entities/budget-box.schema";

@Injectable()
export class BudgetBoxRepository implements IBudgetBoxRepository {

	constructor (
		@InjectModel(BudgetBox.name) 
		private readonly conn: Model<BudgetBoxDocument>
	){}

	find (filter: Filter<Partial<IBudgetBox>>):Promise<BudgetBoxAggregate[] | null> {
		throw new Error(`Method not implemented, ${filter}`);	
	};

	findOne (filter: Filter<Partial<IBudgetBox>>) :Promise<BudgetBoxAggregate | null> {
		throw new Error(`Method not implemented, ${filter}`);
	};

	delete (filter: Filter<Partial<IBudgetBox>>) : Promise<void> {
		throw new Error(`Method not implemented, ${filter}`);
	};

	exists (filter: Filter<Partial<IBudgetBox>>) : Promise<boolean> {
		throw new Error(`Method not implemented, ${filter}`);
	};

	async save (target: BudgetBoxAggregate): Promise<void> {
		const schema = target.toObject<IBudgetBox>();
		const budgetBox = new this.conn(schema);
		await budgetBox.save();
	};

}

export default BudgetBoxRepository;

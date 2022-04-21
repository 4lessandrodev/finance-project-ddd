import { BudgetBox, BudgetBoxDocument } from "@modules/budget-box/infra/entities/budget-box.schema";
import { IBudgetBoxQueryService } from "./budget-box-query.interface";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IBudgetBox } from "@modules/shared";

@Injectable()
export class BudgetBoxQueryService implements IBudgetBoxQueryService {

	constructor (
		@InjectModel(BudgetBox.name) private readonly conn: Model<BudgetBoxDocument>,
	) { }
	async getBudgetBoxByIdAndOwnerId (filter: { ownerId: string; id: string; }): Promise<IBudgetBox | null> {
		const budgetBoxesFound = await this.conn.findOne<IBudgetBox>({ ...filter }, { _id: false, __v: false });

		return budgetBoxesFound;
	}
	async getBudgetBoxesByOwnerId (ownerId: string): Promise<IBudgetBox[]> {
		const budgetBoxesFound = await this.conn.find<IBudgetBox>({ ownerId }, { _id: false, __v: false });

		return budgetBoxesFound;
	}

}

export default BudgetBoxQueryService;

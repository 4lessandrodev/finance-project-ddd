import IReason from "./reason-model.interface";

export interface IBudgetBox {
	
	readonly id: string;

	ownerId: string;

	description: string;

	balanceAvailable: number;

	isPercentage: boolean;

	budgetPercentage: number;

	reasons: IReason[];

	createdAt: Date;

	updatedAt: Date;
}

export default IBudgetBox;

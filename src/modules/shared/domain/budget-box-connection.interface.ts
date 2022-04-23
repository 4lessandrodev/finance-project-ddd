import IBudgetBox from "../interfaces/budget-box-model.interface";

export interface IFilter {
	ownerId: string;
	id: string;
}
export interface IBudgetBoxConnection {
	findBudgetBoxesByUserId(userId: string): Promise<IBudgetBox[]>;
	findBudgetBoxByIdAndUserId(filter: IFilter): Promise<IBudgetBox | null>;
}

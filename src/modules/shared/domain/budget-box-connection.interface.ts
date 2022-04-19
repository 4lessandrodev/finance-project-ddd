import IBudgetBox from "../interfaces/budget-box-model.interface";

export interface IBudgetBoxConnection {
	findBudgetBoxesByUserId(userId: string): Promise<IBudgetBox[]>;
}

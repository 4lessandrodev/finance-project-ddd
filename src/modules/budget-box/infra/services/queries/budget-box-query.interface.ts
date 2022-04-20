import { IBudgetBox } from "@modules/shared";

export interface IBudgetBoxQueryService {
	getBudgetBoxesByOwnerId(ownerId: string): Promise<IBudgetBox[]>;
}

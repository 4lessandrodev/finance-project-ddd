import { IBudgetBox } from "@modules/shared";
export interface IBudgetBoxQueryService {
	getBudgetBoxesByOwnerId(ownerId: string): Promise<IBudgetBox[]>;
	getBudgetBoxByIdAndOwnerId(filter: { ownerId: string, id: string }): Promise<IBudgetBox | null>
}

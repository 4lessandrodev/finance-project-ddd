export class CreateBudgetBoxDto {
	ownerId!: string;
	description!: string;
	isPercentage!: boolean;
	budgetPercentage!: number;
}

export default CreateBudgetBoxDto;

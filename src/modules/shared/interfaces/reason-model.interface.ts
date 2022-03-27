
export interface IReason {
	
	readonly id: string;

	description: string;

	createdAt: Date;

	updatedAt: Date;

	isDeleted?: boolean;
	
	deletedAt?: Date;
}

export default IReason;

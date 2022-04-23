import { ITransaction } from "@modules/shared";

export interface Filter {
	userId: string;
	beforeDate?: Date;
}

export interface ITransactionQueryService {
	getTransactionsByUserId(filter: Filter): Promise<ITransaction[]>;
}

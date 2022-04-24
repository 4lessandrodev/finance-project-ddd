import { ITransaction } from "@modules/shared";

export interface Filter {
	userId: string;
	beforeDate?: Date;
}

export interface IData {
	userId: string;
	id: string;
}

export interface ITransactionQueryService {
	getTransactionsByUserId(filter: Filter): Promise<ITransaction[]>;
	getTransactionById(data: IData): Promise<ITransaction | null >;
}

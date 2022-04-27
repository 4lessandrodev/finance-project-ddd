export interface ITransactionConnection {
	deleteTransactionByUserId(userId: string): Promise<boolean>;
}

export default ITransactionConnection;

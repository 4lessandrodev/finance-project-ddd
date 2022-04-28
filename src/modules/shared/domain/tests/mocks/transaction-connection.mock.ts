import ITransactionConnection from "../../transaction-connection.interface";

export const transactionConnectionMock: ITransactionConnection = {
	deleteTransactionByUserId: jest.fn()
};

export default transactionConnectionMock;

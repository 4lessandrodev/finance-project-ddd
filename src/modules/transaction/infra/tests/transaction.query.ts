import { gql } from "graphql-request";

export const TRANSACTION_FRAGMENT = gql`
	fragment Transaction on BoxTransactionType {
		id
		userId
		reason
		paymentDate
		totalValue {
			value
			currency
		}
		transactionType
		createdAt
	}
`;

export const GET_TRANSACTIONS = gql`
	query { 
		getTransactions {
			...Transaction
		}
	}${TRANSACTION_FRAGMENT}
`;

export const GET_TRANSACTION_BY_ID = gql`
	query($GetTransactionByIdInput: GetTransactionByIdInput!) { 
		getTransactionById(GetTransactionByIdInput: $GetTransactionByIdInput){
			...Transaction
		}
	}${TRANSACTION_FRAGMENT}
`;

import { gql } from "graphql-request";

export const RESULT = gql``;

export const GET_BUDGET_BOXES = gql`
	query { 
		getBudgetBoxes {
			id
			balanceAvailable
			budgetPercentage
			description
			reasons {
				id
			}
			isPercentage
		}
	}
`;

import { gql } from "graphql-request";

export const RESULT = gql``;

export const BUDGET_BOX_FRAGMENT = gql`
	fragment BudgetBox on BudgetBoxType {
		id
		balanceAvailable {
			value
		}
		budgetPercentage
		description
		reasons {
			id
			description
		}
		isPercentage
	}
`;

export const GET_BUDGET_BOXES = gql`
	query { 
		getBudgetBoxes {
			...BudgetBox
		}
	}${BUDGET_BOX_FRAGMENT}
`;

export const GET_BUDGET_BOX_BY_ID = gql`
	query($GetBudgetBoxByIdInput: GetBudgetBoxByIdInput!) { 
		getBudgetBoxById(GetBudgetBoxByIdInput: $GetBudgetBoxByIdInput){
			...BudgetBox
		}
	}${BUDGET_BOX_FRAGMENT}
`;

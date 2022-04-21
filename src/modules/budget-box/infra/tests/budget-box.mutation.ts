import { gql } from "graphql-request";

export const RESULT = gql``;

export const CREATE_BUDGET_BOX_MUTATION = gql`
	mutation($CreateBudgetBoxInput: CreateBudgetBoxInput!) {
		createBudgetBox(CreateBudgetBoxInput: $CreateBudgetBoxInput)
	}${RESULT}
`;

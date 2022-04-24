import { gql } from "graphql-request";

export const RESULT = gql``;

export const CREATE_PERCENTAGE_TRANSACTION = gql`
	mutation($PercentageCapitalInflowPostingInput: PercentageCapitalInflowPostingInput!) {
		percentageCapitalInflowPosting(PercentageCapitalInflowPostingInput: $PercentageCapitalInflowPostingInput)
	}${RESULT}
`;

export const CREATE_BENEFIT_TRANSACTION = gql`
	mutation($PostingToBenefitInput: PostingToBenefitInput!) {
		postingToBenefit(PostingToBenefitInput: $PostingToBenefitInput)
	}${RESULT}
`;

export const CREATE_EXPENSE_TRANSACTION = gql`
	mutation($CreateExpenseInput: CreateExpenseInput!) {
		createExpense(CreateExpenseInput: $CreateExpenseInput)
	}${RESULT}
`;

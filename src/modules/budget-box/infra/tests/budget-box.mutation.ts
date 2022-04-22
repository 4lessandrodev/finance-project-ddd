import { gql } from "graphql-request";

export const RESULT = gql``;

export const CREATE_BUDGET_BOX_MUTATION = gql`
	mutation($CreateBudgetBoxInput: CreateBudgetBoxInput!) {
		createBudgetBox(CreateBudgetBoxInput: $CreateBudgetBoxInput)
	}${RESULT}
`;

export const ADD_REASON_TO_BUDGET_BOX_MUTATION = gql`
	mutation($AddReasonToBudgetBoxInput: AddReasonToBudgetBoxInput!) {
		addReasonToBudgetBox(AddReasonToBudgetBoxInput: $AddReasonToBudgetBoxInput)
	}${RESULT}
`;

export const CHANGE_BUDGET_BOX_REASON_DESCRIPTION_MUTATION = gql`
	mutation($ChangeReasonDescriptionBoxInput: ChangeReasonDescriptionBoxInput!) {
		changeReasonDescription(ChangeReasonDescriptionBoxInput: $ChangeReasonDescriptionBoxInput)
	}${RESULT}
`;

export const REMOVE_REASON_FROM_BUDGET_BOX_MUTATION = gql`
	mutation($RemoveReasonFromBudgetBoxInput: RemoveReasonFromBudgetBoxInput!) {
		removeReasonFromBudgetBox(RemoveReasonFromBudgetBoxInput: $RemoveReasonFromBudgetBoxInput)
	}${RESULT}
`;

export const CHANGE_BUDGET_BOX_NAME_MUTATION = gql`
	mutation($ChangeBudgetBoxNameInput: ChangeBudgetBoxNameInput!) {
		changeBudgetName(ChangeBudgetBoxNameInput: $ChangeBudgetBoxNameInput)
	}${RESULT}
`;

export const CHANGE_BUDGET_BOX_PERCENTAGE_MUTATION = gql`
	mutation($ChangeBudgetBoxPercentageInput: ChangeBudgetBoxPercentageInput!) {
		changeBudgetPercentage(ChangeBudgetBoxPercentageInput: $ChangeBudgetBoxPercentageInput)
	}${RESULT}
`;

import { gql } from "graphql-request";

export const RESULT = gql``;

export const SIGNUP_MUTATION = gql`
	mutation($SignupInput: SignupInput!) {
		signup(SignupInput: $SignupInput)
	}${RESULT}
`;

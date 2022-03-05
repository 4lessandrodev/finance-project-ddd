import { gql } from "graphql-request";

export const RESULT = gql``;

export const TOKEN_RESULT = gql`
	fragment Token on JwtPayloadType {
		token
	}
`;

export const SIGNUP_MUTATION = gql`
	mutation($SignupInput: SignupInput!) {
		signup(SignupInput: $SignupInput)
	}${RESULT}
`;

export const SIGNIN_MUTATION = gql`
	mutation($SigninInput: SigninInput!) {
		signin(SigninInput: $SigninInput){
			...Token
		}
	}${TOKEN_RESULT}
`;

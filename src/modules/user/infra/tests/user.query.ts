import { gql } from "graphql-request";

export const AUTH_QUERY = gql`
	query {
		whoAmI {
			id
			email
			terms {
				ip
			}
		}
	}
`;

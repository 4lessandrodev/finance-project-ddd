import { Query, Resolver } from "@nestjs/graphql";
import { UserType } from "../types/user.type";

@Resolver(()=> UserType)
export class UserResolver {
	//constructor(){}

	@Query(()=> [UserType])
	async users():Promise<UserType[]>{

		const user = new UserType();
		user.email = 'valid_email@domain.com';
		user.id = 'ab535163-6924-420f-80b4-5a01674c51ea';
		user.terms = [];
		user.terms.push({
			acceptedAt: new Date(),
			ip:'123.123.123',
			userAgent:{
				name:'firefox',
				os:'LINUX',
				type:'browser',
				version:'86.01'
			}
		})
		
		return [user];
	}
}
import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from "@app/app.module";
import { PORT, TESTING_HOST } from "@config/env";
import { GraphQLClient } from 'graphql-request';
import { MutationSignupArgs, Mutation, MutationSigninArgs } from '@app/types/code-gen.types';
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from "./user.mutation";
import * as mongoose from "mongoose";
import { Connection } from "mongoose";
import { MongoDbConfig, MongoURI } from "@config/mongo.config";
import { UserSchema } from "@modules/user/infra/entities/user.schema";

describe('user.test', () => {

	let app: INestApplication;
	let client: GraphQLClient;
	let conn: Connection;

	beforeAll(async () => {

		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = module.createNestApplication();

		await app.listen(PORT);
		
		client = new GraphQLClient(TESTING_HOST, {
			credentials: 'include'
		});

		conn = await mongoose.createConnection(MongoURI, MongoDbConfig);
		const model = conn.model('User', UserSchema);

		await model.deleteMany({});
	});

	afterAll(async () => {
		await app.close();
		await conn.close();
	});

	it('should signup with success', async () => {

		type RequestType = Pick<Mutation, 'signup'>;

		const variables: MutationSignupArgs = {
			SignupInput: {
				acceptedTerms: true,
				email: "valid_email@domain.com",
				password: "valid_pass123"
			}
		};

		const payload = await client.request<RequestType, MutationSignupArgs>(SIGNUP_MUTATION, variables);
		
		expect(payload.signup).toBeTruthy();

	});
	
	it('should signin with success', async () => {

		type RequestType = Pick<Mutation, 'signin'>;

		const variables: MutationSigninArgs = {
			SigninInput: {
				email: "valid_email@domain.com",
				password: "valid_pass123"
			}
		};

		const payload = await client.request<RequestType, MutationSigninArgs>(SIGNIN_MUTATION, variables);
		
		expect(payload.signin.token).toBeDefined();
		expect(payload.signin).toHaveProperty('token');

	});
});

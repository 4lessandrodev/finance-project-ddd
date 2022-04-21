import { BudgetBoxSchema } from "@modules/budget-box/infra/entities/budget-box.schema";
import { MongoDbConfig, MongoURI } from "@config/mongo.config";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { PORT, TESTING_HOST } from "@config/env";
import { gql, GraphQLClient } from "graphql-request";
import { AppModule } from "@app/app.module";
import * as mongoose from "mongoose";
import { Connection } from "mongoose";
import UserMock from "@modules/user/domain/tests/mock/user.mock";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import { Mutation, MutationCreateBudgetBoxArgs, MutationSigninArgs, Query } from "@app/types/code-gen.types";
import { CREATE_BUDGET_BOX_MUTATION } from "./budget-box.mutation";
import { UserSchema } from "@modules/user/infra/entities/user.schema";
import { GET_BUDGET_BOXES } from "./budget-box.query";

describe('budget-box.test', () => {

	let app: INestApplication;
	let client: GraphQLClient;
	let conn: Connection;

	const userMock = new UserMock();
	const budgetBoxMock = new BudgetBoxMock();
	const credentials = {
		email: 'valid_email@domain.com',
		password: 'valid_pass123'
	};

	const fakeUser = userMock.domain(credentials).getResult();

	const fakeBudgetBox = budgetBoxMock.domain({
		ownerId: fakeUser.id.uid,
		isPercentage: true,
		budgetPercentage: 99
	}).getResult();

	let token = '';

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
		const budgetModel = conn.model('BudgetBox', BudgetBoxSchema);
		const userModel = conn.model('User', UserSchema);

		await budgetModel.deleteMany({});
		await userModel.deleteMany({});
	
		fakeUser.password.encrypt();

		const doc = fakeUser.toObject();
		
		await userModel.create(doc);

		const SIGNIN_MUTATION = gql`
		mutation($SigninInput: SigninInput!) {
			signin(SigninInput: $SigninInput){
				token
			}
		}
	`;

		type PayloadType = Pick<Mutation, 'signin'>;
		
		const variables: MutationSigninArgs = {
			SigninInput: {
				...credentials
			}
		};

		
		const payload = await client.request<PayloadType>(SIGNIN_MUTATION, variables);

		token = payload.signin.token;
	});

	afterAll(async () => {
		await app.close();
		await conn.close();
	});

	it('should create a budget box with success', async () => {
		
		client.setHeaders({ authorization: `Bearer ${token}` });

		type PayloadType = Pick<Mutation, 'createBudgetBox'>;

		const variables: MutationCreateBudgetBoxArgs = {
			CreateBudgetBoxInput: {
				budgetPercentage: fakeBudgetBox.budgetPercentage.value,
				description: fakeBudgetBox.description.value,
				isPercentage: fakeBudgetBox.isPercentage
			}
		};

		const payload = await client
			.request<PayloadType, MutationCreateBudgetBoxArgs>(
				CREATE_BUDGET_BOX_MUTATION,
				variables
			);
		
		expect(payload.createBudgetBox).toBeTruthy();
	});

	it('should fails if try to create a new budget box and sum more than 100% allocation', async () => {
		
		expect.assertions(2);

		type PayloadType = Pick<Mutation, 'createBudgetBox'>;

		const variables: MutationCreateBudgetBoxArgs = {
			CreateBudgetBoxInput: {
				budgetPercentage: fakeBudgetBox.budgetPercentage.value, // 99% + 99%
				description: fakeBudgetBox.description.value,
				isPercentage: fakeBudgetBox.isPercentage
			}
		};

		try {
			await client.request<PayloadType, MutationCreateBudgetBoxArgs>(
				CREATE_BUDGET_BOX_MUTATION,
				variables
			);
		} catch (error: any) {
			expect(error.response.errors[0].message).toBe('Could not allocate percentage to budget-box. 99% already allocated. Available 1%');
			expect(error.response.errors[0].extensions.code).toBe('422');
		}
	});

	it('should allocate 1% with success', async () => {
		
		client.setHeaders({ authorization: `Bearer ${token}` });

		type PayloadType = Pick<Mutation, 'createBudgetBox'>;

		const variables: MutationCreateBudgetBoxArgs = {
			CreateBudgetBoxInput: {
				budgetPercentage: 1,
				description: fakeBudgetBox.description.value,
				isPercentage: fakeBudgetBox.isPercentage
			}
		};

		const payload = await client
			.request<PayloadType, MutationCreateBudgetBoxArgs>(
				CREATE_BUDGET_BOX_MUTATION,
				variables
			);
		
		expect(payload.createBudgetBox).toBeTruthy();
	});

	it('should get 2 budget boxes for authenticated user', async () => {

		type PayloadType = Pick<Query, 'getBudgetBoxes'>;

		const payload = await client
			.request<PayloadType>(GET_BUDGET_BOXES);
		
		expect(payload.getBudgetBoxes).toHaveLength(2);
		expect(payload.getBudgetBoxes[0].budgetPercentage).toBe(99);
		expect(payload.getBudgetBoxes[1].budgetPercentage).toBe(1);
		
	});
});

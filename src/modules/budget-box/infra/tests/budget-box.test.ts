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
import { UserSchema } from "@modules/user/infra/entities/user.schema";
import { GET_BUDGET_BOXES, GET_BUDGET_BOX_BY_ID } from "./budget-box.query";
import {
	Mutation,
	MutationAddReasonToBudgetBoxArgs,
	MutationCreateBudgetBoxArgs,
	MutationChangeReasonDescriptionArgs,
	MutationSigninArgs,
	Query,
	QueryGetBudgetBoxByIdArgs,
	MutationRemoveReasonFromBudgetBoxArgs,
	MutationChangeBudgetNameArgs,
	MutationChangeBudgetPercentageArgs
} from "@app/types/code-gen.types";
import {
	ADD_REASON_TO_BUDGET_BOX_MUTATION,
	CHANGE_BUDGET_BOX_REASON_DESCRIPTION_MUTATION,
	CREATE_BUDGET_BOX_MUTATION,
	REMOVE_REASON_FROM_BUDGET_BOX_MUTATION,
	CHANGE_BUDGET_BOX_NAME_MUTATION,
	CHANGE_BUDGET_BOX_PERCENTAGE_MUTATION
} from "./budget-box.mutation";

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
	let reasonId = '';
	let budgetBoxId = '';

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
		
		budgetBoxId = payload.getBudgetBoxes[0].id;
	});

	it('should add reason to budget box with success', async () => {
		type PayloadType = Pick<Mutation, 'addReasonToBudgetBox'>;

		const variables: MutationAddReasonToBudgetBoxArgs = {
			AddReasonToBudgetBoxInput: {
				budgetBoxId,
				reasonDescription: 'valid_description'
			}
		};

		const payload = await client
			.request<PayloadType, MutationAddReasonToBudgetBoxArgs>(
				ADD_REASON_TO_BUDGET_BOX_MUTATION, variables
			);

		expect(payload.addReasonToBudgetBox).toBeTruthy();
	});

	it('should get budget box by id', async () => {
		type payloadType = Pick<Query, 'getBudgetBoxById'>;

		const variables: QueryGetBudgetBoxByIdArgs = {
			GetBudgetBoxByIdInput: {
				budgetBoxId
			}
		};

		const payload = await client
			.request<payloadType, QueryGetBudgetBoxByIdArgs>(
				GET_BUDGET_BOX_BY_ID, variables
			);
		
		expect(payload.getBudgetBoxById.description).toBeDefined();
		expect(payload.getBudgetBoxById.reasons[0].description).toBe('valid_description');
		expect(payload.getBudgetBoxById.reasons).toHaveLength(1);

		reasonId = payload.getBudgetBoxById.reasons[0].id;
	});

	it('should change reason description with success', async () => {
		type payloadType = Pick<Mutation, 'changeReasonDescription'>;

		const variables: MutationChangeReasonDescriptionArgs = {
			ChangeReasonDescriptionBoxInput: {
				budgetBoxId,
				reasonId,
				reasonDescription: 'new description'
			}
		};

		const payload = await client
			.request<payloadType, MutationChangeReasonDescriptionArgs>(
				CHANGE_BUDGET_BOX_REASON_DESCRIPTION_MUTATION,
				variables
			);
		
		expect(payload.changeReasonDescription).toBeTruthy();
	});

	it('should remove reason from budget box with success', async () => {

		type payloadType = Pick<Mutation, 'removeReasonFromBudgetBox'>;

		const variables: MutationRemoveReasonFromBudgetBoxArgs = {
			RemoveReasonFromBudgetBoxInput: {
				budgetBoxId,
				reasonId
			}
		};

		const payload = await client
			.request<payloadType, MutationRemoveReasonFromBudgetBoxArgs>(
				REMOVE_REASON_FROM_BUDGET_BOX_MUTATION,
				variables
			);
		
		expect(payload.removeReasonFromBudgetBox).toBeTruthy();
	});

	it('should change budget box description with success', async () => {
		type payloadType = Pick<Mutation, 'changeBudgetName'>;

		const variables: MutationChangeBudgetNameArgs = {
			ChangeBudgetBoxNameInput: {
				budgetBoxId,
				description: 'updated description'
			}
		};

		const payload = await client
			.request<payloadType, MutationChangeBudgetNameArgs>(
				CHANGE_BUDGET_BOX_NAME_MUTATION,
				variables
			);
		
		expect(payload.changeBudgetName).toBeTruthy();
	});

	it('should change budget box percentage with success', async () => {
		type payloadType = Pick<Mutation, 'changeBudgetPercentage'>;

		const variables: MutationChangeBudgetPercentageArgs = {
			ChangeBudgetBoxPercentageInput: {
				budgetBoxId,
				budgetPercentage: 1
			}
		};

		const payload = await client
			.request<payloadType, MutationChangeBudgetPercentageArgs>(
				CHANGE_BUDGET_BOX_PERCENTAGE_MUTATION,
				variables
			);
		
		expect(payload.changeBudgetPercentage).toBeTruthy();
	});
});

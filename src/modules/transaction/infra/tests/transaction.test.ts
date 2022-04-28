import { AppModule } from "@app/app.module";
import { PORT, TESTING_HOST } from "@config/env";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { gql, GraphQLClient } from "graphql-request";
import { Connection } from "mongoose";
import * as mongoose from "mongoose";
import { MongoDbConfig, MongoURI } from "@config/mongo.config";
import { UserSchema } from "@modules/user/infra/entities/user.schema";
import { BudgetBoxSchema } from "@modules/budget-box/infra/entities/budget-box.schema";
import { TransactionSchema } from "@modules/transaction/infra/entities/transaction.schema";
import { BudgetBoxMock } from "@modules/budget-box/domain/tests/mock/budget-box.mock";
import UserMock from "@modules/user/domain/tests/mock/user.mock";
import {
	Mutation, MutationCreateBudgetBoxArgs, MutationCreateExpenseArgs, MutationPercentageCapitalInflowPostingArgs, MutationPostingToBenefitArgs, MutationSigninArgs, Query, QueryGetTransactionByIdArgs, TransactionStatus
} from "@app/types/code-gen.types";
import { IBudgetBox } from "@modules/shared";
import {
	CREATE_BENEFIT_TRANSACTION, CREATE_EXPENSE_TRANSACTION, CREATE_PERCENTAGE_TRANSACTION
} from "./transaction.mutation";
import { GET_TRANSACTIONS, GET_TRANSACTION_BY_ID } from "./transaction.query";

describe('transaction.test', () => {

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
		budgetPercentage: 100
	}).getResult();

	let token = '';
	let percentageBudgetBoxId = '';
	let benefitBudgetBoxId = '';

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
		const userModel = conn.model('User', UserSchema);
		const budgetBoxModel = conn.model('BudgetBox', BudgetBoxSchema);
		const transactionModel = conn.model('Transaction', TransactionSchema);

		await userModel.deleteMany({});
		await budgetBoxModel.deleteMany({});
		await transactionModel.deleteMany({});


		fakeUser.password.encrypt();

		const user = fakeUser.toObject();
		
		await userModel.create(user);

		const SIGNIN_MUTATION = gql`
		mutation($SigninInput: SigninInput!) {
			signin(SigninInput: $SigninInput){
				token
			}
		}`;
		
		type SingInPayloadType = Pick<Mutation, 'signin'>;
		
		const signinVariables: MutationSigninArgs = {
			SigninInput: {
				...credentials
			}
		};

		
		const signinPayload = await client.request<SingInPayloadType>(SIGNIN_MUTATION, signinVariables);

		token = signinPayload.signin.token;

		client.setHeaders({ authorization: `Bearer ${token}` });

		type CreateBudgetBoxPayloadType = Pick<Mutation, 'createBudgetBox'>;

		const createBudgetBoxVariablesPercentage: MutationCreateBudgetBoxArgs = {
			CreateBudgetBoxInput: {
				budgetPercentage: fakeBudgetBox.budgetPercentage.value,
				description: fakeBudgetBox.description.value,
				isPercentage: fakeBudgetBox.isPercentage
			}
		};

		const createBudgetBoxVariablesBenefit: MutationCreateBudgetBoxArgs = {
			CreateBudgetBoxInput: {
				budgetPercentage: fakeBudgetBox.budgetPercentage.value,
				description: fakeBudgetBox.description.value,
				isPercentage: false
			}
		};

		const CREATE_BUDGET_BOX_MUTATION = gql`
			mutation($CreateBudgetBoxInput: CreateBudgetBoxInput!) {
				createBudgetBox(CreateBudgetBoxInput: $CreateBudgetBoxInput)
			}
		`;

		await client
			.request<CreateBudgetBoxPayloadType, MutationCreateBudgetBoxArgs>(
				CREATE_BUDGET_BOX_MUTATION,
				createBudgetBoxVariablesPercentage
			);
		
		await client
			.request<CreateBudgetBoxPayloadType, MutationCreateBudgetBoxArgs>(
				CREATE_BUDGET_BOX_MUTATION,
				createBudgetBoxVariablesBenefit
			);
		
		const budgetBoxPercentage = await budgetBoxModel.findOne<IBudgetBox>({ ownerId: user.id, isPercentage: true });
		const budgetBoxBenefit = await budgetBoxModel.findOne<IBudgetBox>({ ownerId: user.id, isPercentage: false });

		percentageBudgetBoxId = budgetBoxPercentage.id;
		benefitBudgetBoxId = budgetBoxBenefit.id;

	});

	afterAll(async () => {
		await app.close();
		await conn.close();
	});

	it('should create a valid transaction as percentage', async () => {
		type PayloadType = Pick<Mutation, 'percentageCapitalInflowPosting'>;

		const variables: MutationPercentageCapitalInflowPostingArgs = {
			PercentageCapitalInflowPostingInput: {
				total: 10000,
				reason: "salário do mês",
				status: TransactionStatus.Concluido,
				note: "some description",
				paymentDate: "2022-01-01 00:00:00",
			}
		};

		const payload = await client
			.request<PayloadType, MutationPercentageCapitalInflowPostingArgs>(
				CREATE_PERCENTAGE_TRANSACTION,
				variables
			);
		
		expect(payload.percentageCapitalInflowPosting).toBeTruthy();
	});

	it('should create a valid transaction as benefit', async () => {
		type PayloadType = Pick<Mutation, 'postingToBenefit'>;

		const variables: MutationPostingToBenefitArgs = {
			PostingToBenefitInput: {
				total: 600,
				reason: "benefic. do mês",
				status: TransactionStatus.Concluido,
				note: "some description",
				paymentDate: "2022-01-01 00:00:00",
				budgetBoxId: benefitBudgetBoxId
			}
		};

		const payload = await client
			.request<PayloadType, MutationPostingToBenefitArgs>(
				CREATE_BENEFIT_TRANSACTION,
				variables
			);
		
		expect(payload.postingToBenefit).toBeTruthy();
	});

	it('should create a valid expense with success', async () => {
		type PayloadType = Pick<Mutation, 'createExpense'>;

		const variables: MutationCreateExpenseArgs = {
			CreateExpenseInput: {
				total: 2000,
				reason: "comprar Iphone",
				status: TransactionStatus.Concluido,
				paymentDate: "2022-01-01 00:00:00",
				budgetBoxId: percentageBudgetBoxId
			}
		};

		const payload = await client
			.request<PayloadType, MutationCreateExpenseArgs>(
				CREATE_EXPENSE_TRANSACTION,
				variables
			);
		
		expect(payload.createExpense).toBeTruthy();
	});

	it('should get transactions with success', async () => {
		type PayloadType = Pick<Query, 'getTransactions'>;

		const payload = await client
			.request<PayloadType>(GET_TRANSACTIONS);
		
		expect(payload.getTransactions).toBeTruthy();
	});

	it('should get transactions with success', async () => {
		const transactionModel = conn.model('Transaction', TransactionSchema);

		const transaction = await transactionModel.findOne({});

		type PayloadType = Pick<Query, 'getTransactionById'>;

		const variables: QueryGetTransactionByIdArgs = {
			GetTransactionByIdInput: {
				transactionId: transaction.id
			}
		};

		const payload = await client
			.request<PayloadType, QueryGetTransactionByIdArgs>(GET_TRANSACTION_BY_ID, variables);
		
		expect(payload.getTransactionById).toBeTruthy();
	});
});

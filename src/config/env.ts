import * as env from 'env-var';
const { from } = env;
import { envLogger } from './env-logger';
import { DEFAULT_SECRET } from './env-token';

const envVar = from(process.env, {}, envLogger);

export const JWT_SECRET = envVar.get('JWT_SECRET')
	.default(DEFAULT_SECRET)
	.required()
	.asString();

export const DB_NAME = envVar.get('DB_NAME')
	.default('finance_db')
	.required()
	.asString();

export const BUDGET_BOX_COLLECTION_NAME = envVar.get('BUDGET_BOX_COLLECTION_NAME')
	.default('budgetboxes')
	.required()
	.asString();

export const TRANSACTION_COLLECTION_NAME = envVar.get('TRANSACTION_COLLECTION_NAME')
	.default('transactions')
	.required()
	.asString();

export const MONGO_PASSWORD = envVar.get('MONGO_PASSWORD')
	.default('mongo')
	.required()
	.asString();

export const MONGO_USER = envVar.get('MONGO_USER')
	.default('root')
	.required()
	.asString();

export const MONGO_HOST = envVar.get('MONGO_HOST')
	.default('localhost')
	.required()
	.asString();

export const MONGO_PORT = envVar.get('MONGO_PORT')
	.default(27017)
	.required()
	.asPortNumber();

export const PORT = envVar.get('PORT')
	.default(3000)
	.required()
	.asPortNumber();

export const CURRENCY = envVar.get('CURRENCY')
	.default('BRL')
	.required()
	.asEnum(['BRL', 'USD', 'EUR', 'JPY']);

export const TESTING_HOST = envVar.get('TESTING_HOST')
	.default('http://localhost:3000/graphql')
	.required()
	.asUrlString();

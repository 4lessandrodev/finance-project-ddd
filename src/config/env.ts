import { logger } from './env-logger';
import * as env from 'env-var';
import { randomBytes } from 'crypto';
const { from } = env;
const DEFAULT_SECRET = randomBytes(42).toString('base64');
const envVar = from(process.env, {}, logger.info);

export const JWT_SECRET = envVar.get('JWT_SECRET')
	.default(DEFAULT_SECRET)
	.required()
	.asString();

export const DB_NAME = envVar.get('DB_NAME')
	.default('finance_db')
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
	.asEnum(['BRL', 'USD' , 'EUR' , 'JPY']);
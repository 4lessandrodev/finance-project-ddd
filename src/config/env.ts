import * as env from 'env-var';
const { from, logger } = env;

const envVar = from(process.env, {}, logger);

export const JWT_SECRET = envVar.get('JWT_SECRET')
	.default('b57781ce27870c4caf7a19db6dc6bae9')
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
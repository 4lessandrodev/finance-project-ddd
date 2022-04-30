import { DB_NAME, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } from '@config/env';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const MongoDbConfig: MongooseModuleOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: DB_NAME,
};

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PREFIX = IS_PRODUCTION ? 'mongodb+srv' : 'mongodb';
const PARAMS = IS_PRODUCTION ? `/${DB_NAME}?retryWrites=true&w=majority` : `:${MONGO_PORT}`;
export const MongoURI = `${PREFIX}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}${PARAMS}`;

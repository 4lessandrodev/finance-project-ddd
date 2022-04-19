import { DB_NAME, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } from '@config/env';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const MongoDbConfig: MongooseModuleOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: DB_NAME,
};

export const MongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

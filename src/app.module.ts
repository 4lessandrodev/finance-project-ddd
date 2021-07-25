import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UserModule } from './infra/user/user.module';
import { MongoDbConfig, MongoURI } from './db/config';


@Module({
	imports: [
		UserModule,
		MongooseModule.forRoot(MongoURI, MongoDbConfig),
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.gql')
		})
	],
})
export class AppModule { }

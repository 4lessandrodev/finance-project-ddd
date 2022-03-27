import { BudgetBoxModule } from '@modules/budget-box/infra/budget-box.module';
import { UserModule } from '@modules/user/infra/user.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { MongoDbConfig, MongoURI } from './config/mongo.config';


@Module({
	imports: [
		UserModule,
		BudgetBoxModule,
		MongooseModule.forRoot(MongoURI, MongoDbConfig),
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/types/schema.gql')
		})
	],
})
export class AppModule { }

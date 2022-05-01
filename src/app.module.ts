import { BudgetBoxModule } from '@modules/budget-box/infra/budget-box.module';
import { SharedModule } from '@modules/shared/infra/shared.module';
import { TransactionModule } from '@modules/transaction/infra/transaction.module';
import { UserModule } from '@modules/user/infra/user.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { MongoDbConfig, MongoURI } from './config/mongo.config';
import { DocModule } from './docs/doc.module';
import { HealthCheckModule } from './health-check/health-check.module';


@Module({
	imports: [
		DocModule,
		HealthCheckModule,
		SharedModule,
		UserModule,
		BudgetBoxModule,
		TransactionModule,
		MongooseModule.forRoot(MongoURI, MongoDbConfig),
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/types/schema.gql'),
			introspection: true
		})
	],
})
export class AppModule { }

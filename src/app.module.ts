import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UserModule } from './infra/user/user.module';


@Module({
  imports: [
	  UserModule,
	  MongooseModule.forRoot("mongodb://localhost/fiance_api"),
	  GraphQLModule.forRoot({
		autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		playground: true
	  })
  ],
})
export class AppModule {}

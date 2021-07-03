import { Module } from "@nestjs/common";
import { SignUpUseCase } from '@app/user/use-cases/signup/signup.use-case';
import { UserResolver } from "./resolver/user.resolver";
import { UserService } from './user.service';
import { UserRepository } from './repo/user.repository';
import { UserMapper } from './repo/user.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';

@Module({
	imports: [MongooseModule.forFeature(
		[{ name: User.name, schema: UserSchema }])],
	providers: [
		UserMapper,
		{
			provide: 'UserRepository',
			useClass: UserRepository
		},
		SignUpUseCase,
		UserService,
		UserResolver
	],
	exports: []
})
export class UserModule { }
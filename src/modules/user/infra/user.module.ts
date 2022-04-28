import { Module } from "@nestjs/common";
import GetUserByIdUseCase from "@modules/user/application/use-cases/get-user-by-id/get-user-by-id.use-case";
import { SignUpUseCase } from '@modules/user/application/use-cases/signup/signup.use-case';
import { UserResolver } from "./resolver/user.resolver";
import { UserService } from './user.service';
import { UserRepository } from './repo/user.repository';
import { UserToDomainMapper } from './repo/user.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { UserQueryService } from "@modules/user/infra/services/queries/user-query.service";
import { SigninUseCase } from "@modules/user/application/use-cases/signin/signin.use-case";
import { JwtStrategy } from "@modules/user/infra/services/strategies/jwt.strategy";
import { User, UserSchema } from '@modules/user/infra/entities/user.schema';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "@config/env";
import DeleteAccountUseCase from "@modules/user/application/use-cases/delete-account/delete-account.use-case";
import AfterDeleteUserAccount from "@modules/user/domain/subscriptions/after-delete-user-account.subscription";
import { SharedModule } from "@modules/shared";

@Module({
	imports: [
		SharedModule,
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema }
		]),
		PassportModule.register({
			defaultStrategy: 'jwt'
		}),
		JwtModule.register({
			secret: JWT_SECRET,
			signOptions: {
				expiresIn: '8h'
			}
		})
	],
	providers: [
		UserToDomainMapper,
		{
			provide: 'UserRepository',
			useClass: UserRepository
		},
		{
			provide: 'UserQueryService',
			useClass: UserQueryService
		},
		SignUpUseCase,
		SigninUseCase,
		GetUserByIdUseCase,
		UserService,
		UserResolver,
		JwtStrategy,
		PassportModule,
		JwtModule,
		UserQueryService,
		DeleteAccountUseCase,
		AfterDeleteUserAccount
	],
	exports: [PassportModule, JwtModule]
})
export class UserModule { }

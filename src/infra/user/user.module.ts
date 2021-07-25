import { Module } from "@nestjs/common";
import { SignUpUseCase } from '@app/user/use-cases/signup/signup.use-case';
import { UserResolver } from "./resolver/user.resolver";
import { UserService } from './user.service';
import { UserRepository } from './repo/user.repository';
import { UserMapper } from './repo/user.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./services/strategies/jwt.strategy";
import { SigninUseCase } from "@app/user/use-cases/signin/signin.use-case";

@Module({
	imports: [
		MongooseModule.forFeature([
		{ name: User.name, schema: UserSchema }
	]),
	PassportModule.register({
		defaultStrategy: 'jwt'
	}),
	JwtModule.register({
		secret: 'secure_secret',
		signOptions:{
			expiresIn: '8h'
		}
	})
	],
	providers: [
		UserMapper,
		{
			provide: 'UserRepository',
			useClass: UserRepository
		},
		SignUpUseCase,
		SigninUseCase,
		UserService,
		UserResolver,
		JwtStrategy,
		PassportModule,
		JwtModule
	],
	exports: [PassportModule, JwtModule]
})
export class UserModule { }
import { Module } from "@nestjs/common";
import { UserResolver } from "./resolver/user.resolver";
import { UserService } from './user.service';

@Module({
	imports: [],
	providers: [UserService, UserResolver],
	exports: []
})
export class UserModule { }
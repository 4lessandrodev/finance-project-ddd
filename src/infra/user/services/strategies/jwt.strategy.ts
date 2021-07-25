import { ErrorMessages } from "@domain/shared";
import { User, UserDocument } from "@infra/user/entities/user.schema";
import { UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtDecodedPayload } from "./Jwt-decoded.payload";

export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectModel(User.name)
		private readonly conn: Model<UserDocument>
	){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'secure_secret'
		})
	}

	async validate (payload: JwtDecodedPayload): Promise<JwtDecodedPayload> {

		const id = payload.userId;

		const userExist = await this.conn.findOne({id})

		if (!userExist) {
			throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
		}
	
		return { userId: id };
	}

}

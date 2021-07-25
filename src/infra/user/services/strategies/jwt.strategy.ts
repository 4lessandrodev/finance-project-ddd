import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtDecodedPayload } from "./Jwt-decoded.payload";

export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'secure_secret'
		})
	}

	async validate (payload: JwtDecodedPayload) {
		return { userId: payload.userId };
	}
}

import { IUserQueryService } from "@modules/user/infra/services/queries/user-query.interface";
import { User, UserDocument } from "@modules/user/infra/entities/user.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserQueryService implements IUserQueryService{

	constructor (
		@InjectModel(User.name) private readonly conn: Model<UserDocument>,
	) { }
	
	async getUserById (userId: string): Promise<User | null> {
		const userFound = this.conn.findOne(
			{ id: userId },
			{ password: false, _id: false, __v: false }
		);

		if (!userFound) return null;

		return userFound;
	}

}
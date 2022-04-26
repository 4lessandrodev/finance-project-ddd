import { Filter } from 'types-ddd';
import { UserToDomainMapper } from './user.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.schema';
import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { UserAggregate } from '@modules/user/domain';
import { IUserRepository } from '@modules/user/domain/interfaces/user.repository.interface';

export class UserRepository implements IUserRepository {
	// Inject mapper and connection
	constructor (
		@Inject(UserToDomainMapper) private readonly mapper: UserToDomainMapper,
		@InjectModel(User.name) private readonly conn: Model<UserDocument>,
	) { }
	//
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	find (filter: Filter): Promise<UserAggregate[] | null> {
		throw new Error(`Method not implemented for ${filter}`);
	}
	
	async findOne (filter: Filter): Promise<UserAggregate | null> {
		const foundUser = await this.conn.findOne(filter);

		if (!foundUser) {
			return null;
		}

		return this.mapper.map(foundUser).getResult();
	}
	//
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	delete (filter: Filter): Promise<void> {
		throw new Error(`Method not implemented for ${filter}`);
	}

	async exists (filter: Filter): Promise<boolean> {
		const result = await this.conn.exists(filter);
		return !!result;
	}

	async save (target: UserAggregate): Promise<void> {
		const schema = target.toObject();
		const user = new this.conn(schema);
		await user.save();
	}
}

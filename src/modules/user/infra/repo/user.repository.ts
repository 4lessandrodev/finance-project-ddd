import { Filter } from 'types-ddd';
import { UserMapper } from './user.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.schema';
import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { UserAggregate } from '@modules/user/domain';
import { IUserRepository } from '@modules/user/domain/interfaces/user.repository.interface';

export class UserRepository implements IUserRepository {
	// Inject mapper and connection
	constructor (
		@Inject(UserMapper) private readonly mapper: UserMapper,
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

		return this.mapper.toDomain(foundUser);
	}
	//
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	delete (filter: Filter): Promise<void> {
		throw new Error(`Method not implemented for ${filter}`);
	}

	async exists (filter: Filter): Promise<boolean> {
		return await this.conn.exists(filter);
	}

	async save (target: UserAggregate): Promise<void> {
		const schema = this.mapper.toPersistence(target);
		const user = new this.conn(schema);
		await user.save();
	}
}

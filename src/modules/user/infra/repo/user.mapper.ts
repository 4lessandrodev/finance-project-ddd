import { DateValueObject } from '@modules/shared';
import { UserAggregate } from '@modules/user/domain';
import { IpValueObject } from '@modules/user/domain/ip.value-object';
import { PasswordValueObject } from '@modules/user/domain/password.value-object';
import { TermValueObject } from '@modules/user/domain/term.value-object';
import { IMapper, DomainId, EmailValueObject } from 'types-ddd';
import { User } from '../entities/user.schema';

export class UserMapper implements IMapper<UserAggregate, User> {
	toDomain (target: User): UserAggregate {
		return UserAggregate.create(
			{
				ID: DomainId.create(target.id),
				email: EmailValueObject.create(target.email).getResult(),
				password: PasswordValueObject.create(target.password).getResult(),
				terms: target.terms.map((term) =>
					TermValueObject.create({
						acceptedAt: DateValueObject.create(term.acceptedAt).getResult(),
						ip: IpValueObject.create(term.ip).getResult(),
						userAgent: {
							name: term.userAgent.name,
							os: term.userAgent.os,
							type: term.userAgent.type,
							version: term.userAgent.version,
						},
					}).getResult(),
				),
				createdAt: target.createdAt,
				updatedAt: target.updatedAt,
			}
		).getResult();
	}
	//
	toPersistence (target: UserAggregate): User {
		return {
			id: target.id.value.toString(),
			email: target.email.value,
			password: target.password.value,
			createdAt: target.createdAt,
			updatedAt: target.updatedAt,
			terms: target.terms.map(({ terms }) => ({
				ip: terms.ip.value,
				acceptedAt: terms.acceptedAt.value,
				userAgent: terms.userAgent,
			})),
		};
	}
}

import { UserAggregate } from '@modules/user/domain';
import { IpValueObject } from '@modules/user/domain/ip.value-object';
import { TermValueObject } from '@modules/user/domain/term.value-object';
import { TMapper, DomainId, EmailValueObject, PasswordValueObject, DateValueObject, Result } from 'types-ddd';
import { User } from '../entities/user.schema';

export class UserToDomainMapper implements TMapper<User, UserAggregate> {
	map (target: User): Result<UserAggregate> {
		return UserAggregate.create(
			{
				ID: DomainId.create(target.id),
				email: EmailValueObject.create(target.email).getResult(),
				password: PasswordValueObject.create(target.password).getResult(),
				terms: target.terms.map((term) =>
					TermValueObject.create({
						acceptedAt: DateValueObject.create(term.acceptedAt).getResult(),
						ip: IpValueObject.create(term.ip).getResult(),
						isAccepted: true,
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
		);
	}
}
export default UserToDomainMapper;

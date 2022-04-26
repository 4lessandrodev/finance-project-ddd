import { IMockEntity, IUser } from "@shared/index";
import { UserAggregate } from "@modules/user/domain/user.aggregate";
import { TermValueObject } from "@modules/user/domain/term.value-object";
import { IpValueObject } from "@modules/user/domain/ip.value-object";
import {
	ChangesObserver,
	DateValueObject,
	DomainId,
	EmailValueObject,
	PasswordValueObject,
	Result
} from "types-ddd";

export class UserMock implements IMockEntity<UserAggregate, IUser> {
	domain (props?: Partial<IUser>): Result<UserAggregate> {
		
		const ID = DomainId.create(props?.id ?? 'valid_id');
		const email = EmailValueObject.create(props?.email ?? 'valid_email@domain.com');
		const password = PasswordValueObject.create(props?.password ?? 'valid_password');
		
		const ips = props?.terms?.map((term) => IpValueObject.create(term.ip));
		
		const observer = ChangesObserver.init<unknown>(ips);
		observer.add(email);
		observer.add(password);

		if (observer.getResult().isFailure) {
			return Result.fail(observer.getResult().errorValue());
		}

		observer.reset();

		const terms = props?.terms?.map((term, index) => TermValueObject.create(
			{
				ip: ips?.[index]?.getResult() ?? IpValueObject.create('127.0.0.1').getResult(),
				acceptedAt: DateValueObject.create(term?.acceptedAt ?? new Date('2022-01-01 00:00:00')).getResult(),
				isAccepted: true,
				userAgent: term?.userAgent ?? {
					name: 'firefox',
					os: 'linux',
					type: 'browser',
					version: '86.0.1'
				}
			}
		)) ?? [
			TermValueObject.create({
				acceptedAt: DateValueObject.create(new Date('2022-01-01 00:00:00')).getResult(),
				ip: IpValueObject.create('127.0.0.1').getResult(),
				isAccepted: true,
				userAgent: {
					name: 'firefox',
					os: 'linux',
					type: 'browser',
					version: '86.0.1'
				}
			})
		];

		terms?.map((term) => observer.add(term));

		if (observer.getResult().isFailure) {
			return Result.fail(observer.getResult().errorValue());
		}
		return UserAggregate.create(
			{
				ID,
				email: email.getResult(),
				password: password.getResult(),
				createdAt: props?.createdAt ?? new Date('2022-01-01 00:00:00'),
				updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
				isDeleted: false,
				deletedAt: undefined,
				terms: terms?.map((term) => term.getResult()) ?? []
			}
		);
	}
	model (props?: Partial<IUser>): IUser {
		return {
			id: props?.id ?? 'valid_id',
			createdAt: props?.createdAt ?? new Date('2022-01-01 00:00:00'),
			email: props?.email ?? 'valid_email@domain.com',
			password: props?.password ?? 'valid_password',
			isDeleted: props?.isDeleted ?? false,
			updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
			terms: props?.terms ?? [
				{
					ip: '127.0.0.1',
					acceptedAt: new Date('2022-01-01 00:00:00'),
					isAccepted: true,
					userAgent: {
						name: 'firefox',
						os: 'linux',
						type: 'browser',
						version: '86.0.1'
					}
				}
			]
		};
	}
}

export default UserMock;

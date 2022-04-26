import { UserAggregate } from '@modules/user/domain';
import { IpValueObject } from '@modules/user/domain/ip.value-object';
import { TermValueObject } from '@modules/user/domain/term.value-object';
import { DateValueObject, DomainId, EmailValueObject, PasswordValueObject } from 'types-ddd';
import { User } from '../entities/user.schema';
import { UserToDomainMapper } from './user.mapper';

describe('user.mapper', () => {
	//
	const currentDate = new Date('2020-01-01 00:00:00');
	//
	let domain: UserAggregate;
	let persistence: User;
	//
	beforeAll(() => {
		// Create user from domain
		domain = UserAggregate.create(
			{
				ID: DomainId.create('valid_id'),
				email: EmailValueObject.create('valid_mail@domain.com').getResult(),
				password: PasswordValueObject.create('valid_password').getResult(),
				terms: [
					TermValueObject.create({
						acceptedAt: DateValueObject.create(currentDate).getResult(),
						ip: IpValueObject.create('45.192.110.42').getResult(),
						isAccepted: true,
						userAgent: {
							name: 'firefox',
							os: 'LINUX',
							type: 'browser',
							version: '80.0.1',
						},
					}).getResult(),
				],
				createdAt: currentDate,
				updatedAt: currentDate,
			},
		).getResult();

		// Create persistence user
		persistence = {
			createdAt: currentDate,
			email: 'valid_mail@domain.com',
			id: 'valid_id',
			password: 'valid_password',
			isDeleted: false,
			terms: [
				{
					ip: '45.192.110.42',
					acceptedAt: currentDate,
					isAccepted: true,
					userAgent: {
						name: 'firefox',
						os: 'LINUX',
						type: 'browser',
						version: '80.0.1',
					},
				},
			],
			updatedAt: currentDate,
		};
	});
	//
	it('should be defined', () => {
		const mapper = new UserToDomainMapper();
		expect(mapper).toBeDefined();
	});

	it('should convert object from persistence to domain', () => {
		const mapper = new UserToDomainMapper();
		const result = mapper.map(persistence);
		expect(result.getResult()).toEqual(domain);
	});

	it('should convert object from domain to persistence', () => {
		const result = domain.toObject();
		expect(result).toEqual(persistence);
		expect(domain.toObject()).toMatchSnapshot();
	});
});

import { UserAggregate } from '../user.aggregate';
import { DateValueObject, DomainId, EmailValueObject, PasswordValueObject } from 'types-ddd';
import { TermValueObject } from '../term.value-object';
import { IpValueObject } from '../ip.value-object';

describe('user.aggregate', () => {
	it('should create a valid user', () => {
		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			terms: [
				TermValueObject.create({
					acceptedAt: DateValueObject.create(new Date()).getResult(),
					ip: IpValueObject.create('45.192.110.42').getResult(),
					userAgent: {
						name: 'firefox',
						os: 'LINUX',
						type: 'browser',
						version: '80.0.1',
					},
				}).getResult(),
			],
		});

		expect(user.isSuccess).toBe(true);
	});

	it('should get valid values', () => {
		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('valid_mail@domain.com').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
			terms: [
				TermValueObject.create({
					acceptedAt: DateValueObject.create(new Date('2020-01-01 00:00:00')).getResult(),
					ip: IpValueObject.create('45.192.110.42').getResult(),
					userAgent: {
						name: 'firefox',
						os: 'LINUX',
						type: 'browser',
						version: '80.0.1',
					},
				}).getResult(),
			],
		});

		const userResult = user.getResult();

		expect(userResult.id).toBeDefined();
		expect(userResult.createdAt).toBeDefined();
		expect(userResult.email.value).toBe('valid_mail@domain.com');
		expect(userResult.isDeleted).toBeFalsy();
		expect(userResult.password.value).toBe('valid_password');
		expect(userResult.terms[0].acceptedAt.value).toBeDefined();
		expect(userResult.terms[0].ip.value).toBe('45.192.110.42');
		expect(userResult.terms[0].userAgent).toEqual({
			name: 'firefox',
			os: 'LINUX',
			type: 'browser',
			version: '80.0.1',
		});

		expect(userResult.terms).toMatchSnapshot();
	});

	it('should create a valid user with provided id', () => {
		const user = UserAggregate.create(
			{
				ID: DomainId.create('valid_id'),
				email: EmailValueObject.create('valid_mail@domain.com').getResult(),
				password: PasswordValueObject.create('valid_password').getResult(),
				terms: [
					TermValueObject.create({
						acceptedAt: DateValueObject.create(new Date()).getResult(),
						ip: IpValueObject.create('45.192.110.42').getResult(),
						userAgent: {
							name: 'firefox',
							os: 'LINUX',
							type: 'browser',
							version: '80.0.1',
						},
					}).getResult(),
				],
			},
		);

		expect(user.getResult().id.toValue()).toBe('valid_id');
	});
});
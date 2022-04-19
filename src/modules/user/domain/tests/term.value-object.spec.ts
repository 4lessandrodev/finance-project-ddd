import { DateValueObject } from 'types-ddd';
import { IpValueObject } from '../ip.value-object';
import { TermValueObject } from '../term.value-object';

describe('term.value-object', () => {
	interface fakeTermProps {
		ip: string;
		acceptedAt: Date;
		userAgent: {
			name: string;
			version: string;
			os: string;
			type: string;
		};
	}

	const makeFakeTermProps = (props?: Partial<fakeTermProps>): fakeTermProps => {
		return {
			userAgent: {
				name: props?.userAgent?.name ?? 'firefox',
				os: props?.userAgent?.os ?? 'LINUX',
				type: props?.userAgent?.type ?? 'browser',
				version: props?.userAgent?.version ?? '86.0.0',
			},
			acceptedAt: props?.acceptedAt ?? new Date('2020-01-01 00:00:00'),
			ip: props?.ip ?? '123.123.123.123',
		};
	};

	it('should create a valid term', () => {
		const props = makeFakeTermProps();
		const term = TermValueObject.create({
			acceptedAt: DateValueObject.create(props.acceptedAt).getResult(),
			ip: IpValueObject.create(props.ip).getResult(),
			userAgent: props.userAgent,
			isAccepted: true
		});

		expect(term.isSuccess).toBe(true);
		expect(term.getResult()).toBe(term.getResult());
	});
});

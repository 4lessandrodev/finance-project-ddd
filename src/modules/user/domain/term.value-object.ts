import { ValueObject, Result, DateValueObject } from 'types-ddd';
import { IpValueObject } from './ip.value-object';

export interface IUserAgent {
	name: string;
	version: string;
	os: string;
	type: string;
}

export interface TermValueObjectProps {
	ip: IpValueObject;
	acceptedAt: DateValueObject;
	userAgent: IUserAgent;
	isAccepted: boolean;
}

export class TermValueObject extends ValueObject<TermValueObjectProps> {
	private constructor (props: TermValueObjectProps) {
		super(props);
	}

	get ip (): IpValueObject {
		return this.props.ip;
	}

	get acceptedAt (): DateValueObject {
		return this.props.acceptedAt;
	}

	get userAgent (): IUserAgent {
		return this.props.userAgent;
	}

	public static create (props: TermValueObjectProps): Result<TermValueObject> {
		if (!props.isAccepted) {
			return Result.fail('Terms must be accepted');
		}
		return Result.ok<TermValueObject>(new TermValueObject(props));
	}
}

export default TermValueObject;

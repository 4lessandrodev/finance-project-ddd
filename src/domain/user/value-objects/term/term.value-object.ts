import { DateValueObject } from '@shared/index';
import { IpValueObject } from '@domain/index';
import { ValueObject, Result } from 'types-ddd';

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
}

export class TermValueObject extends ValueObject<TermValueObjectProps> {
	private constructor(props: TermValueObjectProps) {
		super(props);
	}

	get terms(): TermValueObjectProps {
		return this.props;
	}

	public static create(props: TermValueObjectProps): Result<TermValueObject> {
		return Result.ok<TermValueObject>(new TermValueObject(props));
	}
}

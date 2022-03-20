import { ErrorMessages } from '@shared/index';
import { Result, ValueObject } from 'types-ddd';
const validateIpRegex = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/;

export interface IpValueObjectProps {
  value: string;
}

export class IpValueObject extends ValueObject<IpValueObjectProps> {
	private constructor (props: IpValueObjectProps) {
		super(props);
	}

	get value (): string {
		return this.props.value;
	}

	public static isValidValue (ip: string): boolean {
		return validateIpRegex.test(ip);
	}

	public static create (ip: string): Result<IpValueObject> {
		
		const isValidIp = IpValueObject.isValidValue(ip);

		if (!isValidIp) {
			return Result.fail<IpValueObject>(ErrorMessages.INVALID_IP);
		}
		return Result.ok<IpValueObject>(new IpValueObject({ value: ip }));
	}
}

export default IpValueObject;

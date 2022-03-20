import { ErrorMessages } from '@shared/index';
import isURL from 'validator/lib/isURL';
import { ValueObject, Result } from 'types-ddd';
const validateDirectoryPath = /^(.+)\/([^\/]+)$/;

export interface AttachmentPathValueObjectProps {
  value: string;
}

export class AttachmentPathValueObject extends ValueObject<AttachmentPathValueObjectProps> {
	private constructor (props: AttachmentPathValueObjectProps) {
		super(props);
	}

	get value (): string {
		return this.props.value;
	}

	public static isValidValue (value: string): boolean {
		const isValidUrl = isURL(value);
		const isValidDirectory = validateDirectoryPath.test(value);
		const isValid = isValidUrl || isValidDirectory;
		return isValid;
	}

	/**
   *
   * @param path url or directory path
   * @returns instance of `AttachmentPathValueObject`
   */
	public static create (path: string): Result<AttachmentPathValueObject> {
		const isValidUrl = AttachmentPathValueObject.isValidValue(path);

		if (!isValidUrl) {
			return Result.fail<AttachmentPathValueObject>(
				ErrorMessages.INVALID_ATTACHMENT_PATH,
			);
		}

		return Result.ok<AttachmentPathValueObject>(
			new AttachmentPathValueObject({ value: path }),
		);
	}
}

export default AttachmentPathValueObject;

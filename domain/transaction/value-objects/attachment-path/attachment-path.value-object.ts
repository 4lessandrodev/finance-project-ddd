import { Result, ValueObject } from '../../../shared';
import isURL from 'validator/lib/isURL';
const validateDirectoryPath = /^(.+)\/([^\/]+)$/;

export interface AttachmentPathValueObjectProps {
  value: string;
}

export class AttachmentPathValueObject extends ValueObject<AttachmentPathValueObjectProps> {
  private constructor(props: AttachmentPathValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(path: string): Result<AttachmentPathValueObject> {
    const isValidUrl = isURL(path);
    const isValidDirectory = validateDirectoryPath.test(path);

    if (!isValidUrl && !isValidDirectory) {
      return Result.fail<AttachmentPathValueObject>('Invalid path');
    }

    return Result.ok<AttachmentPathValueObject>(
      new AttachmentPathValueObject({ value: path }),
    );
  }
}

import {
  ErrorMessages,
  Result,
  ValueObject,
  DateValueObject,
} from '@shared/index';
import { IpValueObject } from '@domain/user/value-objects';

export enum IOs {
  LINUX = 'LINUX',
  WINDOWS = 'WINDOWS',
  MAC = 'MAC',
  IPHONE = 'IPHONE',
  APPLE = 'APPLE',
  MACINTOSH = 'MACINTOSH',
  ANDROID = 'ANDROID',
  IPAD = 'IPAD',
}

export interface IUserAgent {
  name: string;
  version: string;
  os: keyof typeof IOs;
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

  get value(): TermValueObjectProps {
    return this.props;
  }

  public static create(props: TermValueObjectProps): Result<TermValueObject> {
    const isValidOs = Object.values(IOs).includes(
      props.userAgent.os.toUpperCase() as any,
    );

    if (!isValidOs) {
      return Result.fail<TermValueObject>(
        ErrorMessages.INVALID_OPERATIONAL_SYSTEM,
      );
    }
    return Result.ok<TermValueObject>(new TermValueObject(props));
  }
}

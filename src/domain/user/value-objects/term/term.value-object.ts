import {
  ErrorMessages,
  Result,
  ValueObject,
  DateValueObject,
} from '@shared/index';
import { IpValueObject } from '@domain/index';

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

export type systemTypes = keyof typeof IOs;

export interface IUserAgent {
  name: string;
  version: string;
  os: systemTypes;
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

import { IMapper, UniqueEntityID } from 'types-ddd';
import { UserAggregate } from '@domain/user/aggregates';
import { User } from '../entities/user.schema';
import {
  DateValueObject,
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '@domain/user/value-objects';

export class UserMapper implements IMapper<UserAggregate, User> {
  toDomain(target: User): UserAggregate {
    return UserAggregate.create(
      {
        email: EmailValueObject.create(target.email).getResult(),
        password: PasswordValueObject.create(target.password).getResult(),
        terms: target.terms.map((term) =>
          TermValueObject.create({
            acceptedAt: DateValueObject.create(term.acceptedAt).getResult(),
            ip: IpValueObject.create(term.ip).getResult(),
            userAgent: {
              name: term.userAgent.name,
              os: term.userAgent.os,
              type: term.userAgent.type,
              version: term.userAgent.version,
            },
          }).getResult(),
        ),
        createdAt: target.createdAt,
        updatedAt: target.updatedAt,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }
  //
  toPersistence(target: UserAggregate): User {
    return {
      id: target.id.toString(),
      email: target.email.value,
      password: target.password.value,
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
      terms: target.terms.map(({ terms }) => ({
        ip: terms.ip.value,
        acceptedAt: terms.acceptedAt.value,
        userAgent: terms.userAgent,
      })),
    };
  }
}

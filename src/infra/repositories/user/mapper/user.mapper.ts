import { BudgetIdValueObject } from '@domain/budget-box/value-objects';
import { MapperInterface } from '@infra/repositories/shared';
import { UserPersistence as Entity } from '../interfaces/user-persistence.interface';
import { UserAggregate } from '@domain/user/aggregates';
import { UniqueEntityID } from '@domain/shared';
import {
  DateValueObject,
  EmailValueObject,
  IpValueObject,
  PasswordValueObject,
  TermValueObject,
} from '@domain/user/value-objects';

/**
 * @description transform a entity from database on domain aggregate
 * @implements MapperInterface
 * @with `UserPersistence`
 * @with `UserAggregate`
 * @see MapperInterface
 */
export class UserMapper implements MapperInterface<Entity, UserAggregate> {
  //
  /**
   *
   * @param target UserAggregate
   * @returns UserPersistence
   *
   * @see UserAggregate
   * @see UserPersistence
   */
  toPersistence(target: UserAggregate): Entity {
    return {
      id: target.id.toString(),
      email: target.email.value,
      password: target.password.value,
      terms: target.terms.map(({ terms }) => ({
        acceptedAt: terms.acceptedAt.value.toISOString(),
        ip: terms.ip.value,
        userAgent: { ...terms.userAgent },
      })),
      totalBalanceAvaliable: target.totalBalanceAvaliable,
      budgetBoxIds: target.budgetBoxIds.map(({ id }) => id.toString()),
      isDeleted: target.isDeleted,
      updatedAt: target.updatedAt.toISOString(),
      createdAt: target.createdAt.toISOString(),
      deletedAt: target.deletedAt ? target.deletedAt.toISOString() : undefined,
    };
  }
  //
  /**
   *
   * @param target UserPersistence
   * @returns UserAggregate
   *
   * @see UserPersistence
   * @see UserAggregate
   */
  toDomain(target: Entity): UserAggregate {
    return UserAggregate.create(
      {
        email: EmailValueObject.create(target.email).getResult(),
        password: PasswordValueObject.create(target.password).getResult(),
        terms: target.terms.map(({ acceptedAt, ip, userAgent }) =>
          TermValueObject.create({
            acceptedAt: DateValueObject.create(
              new Date(acceptedAt),
            ).getResult(),
            ip: IpValueObject.create(ip).getResult(),
            userAgent: userAgent as any,
          }).getResult(),
        ),
        totalBalanceAvaliable: target.totalBalanceAvaliable,
        budgetBoxIds: target.budgetBoxIds?.map((id) =>
          BudgetIdValueObject.create(new UniqueEntityID(id)).getResult(),
        ),
        createdAt: new Date(target.createdAt),
        isDeleted: target.isDeleted,
        updatedAt: new Date(target.updatedAt),
        deletedAt: target.deletedAt ? new Date(target.deletedAt) : undefined,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }
}

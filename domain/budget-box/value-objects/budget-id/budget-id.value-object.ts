import { Entity, Result, UniqueEntityID } from '../../../shared';

export class BudgetIdValueObject extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(id?: UniqueEntityID): Result<BudgetIdValueObject> {
    return Result.ok<BudgetIdValueObject>(new BudgetIdValueObject(id));
  }
}

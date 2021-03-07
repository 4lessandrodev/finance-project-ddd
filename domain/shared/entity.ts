import { BaseDomainEntity, UniqueEntityID } from './index';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T extends BaseDomainEntity> {
  protected readonly _id: UniqueEntityID;
  protected readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get updatedAt(): Date {
    return this.props.updatedAt ?? new Date();
  }

  get isDeleted(): boolean {
    return this.props.isDeleted ?? false;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}

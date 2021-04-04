import { UniqueEntityID } from '../..';
import { ReasonIdValueObject } from './reason-id.value-object';

describe('reasonId.value-object', () => {
  it('should create a valid reasonId', () => {
    const reasonId = ReasonIdValueObject.create();
    expect(reasonId.isSuccess).toBe(true);
    expect(reasonId.getResult().id.toValue).toBeDefined();
  });

  it('should create a valid reasonId with value', () => {
    const reasonId = ReasonIdValueObject.create(new UniqueEntityID('valid_id'));
    expect(reasonId.isSuccess).toBe(true);
    expect(reasonId.getResult().id.toValue()).toBe('valid_id');
  });
});

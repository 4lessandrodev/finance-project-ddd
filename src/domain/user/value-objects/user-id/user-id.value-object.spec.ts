import { UniqueEntityID } from '../../../shared';
import { UserIdValueObject } from './user-id.value-object';

describe('userId.value-object', () => {
  it('should create a valid userId', () => {
    const userId = UserIdValueObject.create();
    expect(userId.isSuccess).toBe(true);
    expect(userId.getResult().id.toValue).toBeDefined();
  });

  it('should create a valid userId with value', () => {
    const userId = UserIdValueObject.create(new UniqueEntityID('valid_id'));
    expect(userId.isSuccess).toBe(true);
    expect(userId.getResult().id.toValue()).toBe('valid_id');
  });
});

import { AcceptedAtValueObject } from './accepted-at.value-object';

describe('accepted-at.value-object', () => {
  it('should create a valid acceptance date', () => {
    const acceptedAt = AcceptedAtValueObject.create(
      new Date('2020-01-02 10:00:00'),
    );

    expect(acceptedAt.isSuccess).toBe(true);
    expect(acceptedAt.getResult().value).toBe('2020-01-02 10:00:00');
  });

  it('should fail if provide an invalid date', () => {
    const acceptedAt = AcceptedAtValueObject.create('invalid date' as any);

    expect(acceptedAt.isFailure).toBe(true);
    expect(acceptedAt.error).toBe('Invalid date');
  });
});

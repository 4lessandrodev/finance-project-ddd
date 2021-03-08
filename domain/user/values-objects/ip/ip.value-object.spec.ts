import { IpValueObject } from './ip.value-object';

describe('ip.value-object', () => {
  it('should create a valid ip', () => {
    const ip = IpValueObject.create('123.123.123.123');

    expect(ip.isSuccess).toBe(true);
    expect(ip.getResult().value).toBe('123.123.123.123');
  });

  it('should fail if provide an invalid ip', () => {
    const ip = IpValueObject.create('invalid_ip');

    expect(ip.isFailure).toBe(true);
    expect(ip.error).toBe('Invalid Ip');
  });
});

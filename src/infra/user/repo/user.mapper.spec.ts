import { UserMapper } from './user.mapper';

describe('user.mapper', () => {
  it('should be defined', () => {
    const mapper = new UserMapper();
    expect(mapper).toBeDefined();
  });
});

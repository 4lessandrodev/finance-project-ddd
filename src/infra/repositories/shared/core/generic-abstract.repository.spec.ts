import { GenericAbstractRepository } from './generic-abstract.repository';

describe('generic-abstract.repository', () => {
  //
  // Defines connection and mapper
  const connection: any = jest.fn();
  const mapper: any = jest.fn();
  const mockRepo = class mock extends GenericAbstractRepository<any, any> {};

  it('should be definied', () => {
    const instance = new mockRepo(connection, mapper);

    expect(instance).toBeDefined();
  });
});

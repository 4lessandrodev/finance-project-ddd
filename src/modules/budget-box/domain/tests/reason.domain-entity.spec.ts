import { ReasonMock } from './mock/reason.mock';

describe('reason.domain-entity', () => {

	const mockReason = new ReasonMock();

	it('should create a valid reason entity', () => {
		const reasonEntity = mockReason.domain();

		expect(reasonEntity.isSuccess).toBe(true);
		expect(reasonEntity.getResult().isDeleted).toBe(false);
		expect(reasonEntity.getResult().description.value).toBe('valid_description');
	});

	it('should create a valid reason entity with provided id', () => {
		const reasonEntity = mockReason.domain({ id: 'valid_id' });

		expect(reasonEntity.isSuccess).toBe(true);
		expect(reasonEntity.getResult().isDeleted).toBe(false);
		expect(reasonEntity.getResult().id.toValue()).toBe('valid_id');
	});
});

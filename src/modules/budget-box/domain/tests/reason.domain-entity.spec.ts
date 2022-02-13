import { DomainId } from 'types-ddd';
import { ReasonDescriptionValueObject } from '../reason-description.value-object';
import { ReasonDomainEntity } from '../reason.domain-entity';

describe('reason.domain-entity', () => {
	it('should create a valid reason entity', () => {
		const reasonEntity = ReasonDomainEntity.create({
			ID: DomainId.create(),
			description: ReasonDescriptionValueObject.create(
				'valid_description',
			).getResult(),
		});
		expect(reasonEntity.isSuccess).toBe(true);
		expect(reasonEntity.getResult().isDeleted).toBe(false);
		expect(reasonEntity.getResult().description.value).toBe(
			'valid_description',
		);
	});

	it('should create a valid reason entity with provided id', () => {
		const reasonEntity = ReasonDomainEntity.create(
			{
				ID: DomainId.create('valid_id'),
				description: ReasonDescriptionValueObject.create(
					'valid_description',
				).getResult(),
			}
		);
		expect(reasonEntity.isSuccess).toBe(true);
		expect(reasonEntity.getResult().isDeleted).toBe(false);
		expect(reasonEntity.getResult().description.value).toBe(
			'valid_description',
		);
		expect(reasonEntity.getResult().id.toValue()).toBe('valid_id');
	});
});

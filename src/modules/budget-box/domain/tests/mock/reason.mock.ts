import { ReasonDescriptionValueObject } from "@modules/budget-box/domain/reason-description.value-object";
import IMockEntity from "@modules/shared/interfaces/entity-mock.interface";
import { ReasonDomainEntity } from "@modules/budget-box/domain/reason.domain-entity";
import IReason from "@modules/shared/interfaces/reason-model.interface";
import { DomainId, Result } from "types-ddd";

export class ReasonMock implements IMockEntity<ReasonDomainEntity, IReason>{
	domain (props?: Partial<IReason>): Result<ReasonDomainEntity, string> {
		
		const ID = DomainId.create(props?.id ?? 'valid_id');
		const description = ReasonDescriptionValueObject.create(props?.description ?? 'valid_description');

		if (description.isFailure) {
			return Result.fail(description.error);
		}

		return ReasonDomainEntity.create(
			{
				ID,
				description: description.getResult(),
				createdAt: props?.createdAt ?? new Date('2022-01-01 00:00:00'),
				deletedAt: undefined,
				isDeleted: false,
				updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00'),
			}
		);
	}
	model (props?: Partial<IReason>): IReason {
		return {
			id: props?.id ?? 'valid_id',
			description: props?.description ?? 'valid_description',
			createdAt: props?.createdAt ?? new Date('2022-01-01 00:00:00'),
			updatedAt: props?.updatedAt ?? new Date('2022-01-01 00:00:00')
		};
	}

}

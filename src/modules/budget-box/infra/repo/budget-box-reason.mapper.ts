import ReasonDescriptionValueObject from "@modules/budget-box/domain/reason-description.value-object";
import ReasonDomainEntity from "@modules/budget-box/domain/reason.domain-entity";
import { IReason } from "@shared/index";
import { Injectable } from "@nestjs/common";
import { DomainId, Result, TMapper } from "types-ddd";

@Injectable()
export class ReasonToDomainMapper implements TMapper<IReason, ReasonDomainEntity>{
	map (target: IReason): Result<ReasonDomainEntity, string>{
		
		const descriptionOrError = ReasonDescriptionValueObject.create(target.description);

		if (descriptionOrError.isFailure) {
			const message = descriptionOrError.errorValue();
			return Result.fail(message, 'UNPROCESSABLE_ENTITY');
		}

		return ReasonDomainEntity.create({
			ID: DomainId.create(target.id),
			description: descriptionOrError.getResult(),
			createdAt: target.createdAt,
			updatedAt: target.updatedAt,
			isDeleted: target.isDeleted,
			deletedAt: target.deletedAt
		});
	};
}

export default ReasonToDomainMapper;

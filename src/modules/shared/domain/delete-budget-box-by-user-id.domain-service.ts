import { Inject } from "@nestjs/common";
import { Result } from "types-ddd";
import { IDomainService } from "@modules/shared/interfaces/domain-service.interface";
import { IBudgetBoxConnection } from "./budget-box-connection.interface";

interface Dto {
	userId: string;
}

export class DeleteBudgetBoxByUserIdDomainService implements IDomainService<Dto, Result<boolean>>{
	constructor (
		@Inject('BudgetBoxConnection')
		private readonly connection: IBudgetBoxConnection
	) { }
	async execute ({ userId }: Dto): Promise<Result<boolean>> {
		try {

			const isSuccess = await this.connection.deleteBudgetBoxByUserId(userId);

			if (!isSuccess) {
				return Result.fail('Could not delete budget boxes for user', 'GATEWAY_TIMEOUT');
			}
			
			return Result.success();

		} catch (error) {
			return Result.fail(
				`Internal Server Error On Delete Budget Box By UserId Domain Service`, 'INTERNAL_SERVER_ERROR'
			);
		}
	}
}

export default DeleteBudgetBoxByUserIdDomainService;

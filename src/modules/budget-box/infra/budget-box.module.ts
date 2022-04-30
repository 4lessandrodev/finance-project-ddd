import { BudgetBoxConnection, SharedModule } from "@modules/shared";
import BudgetBoxResolver from "@modules/budget-box/infra/resolver/budget-box.resolver";
import BudgetBoxRepository from "@modules/budget-box/infra/repo/budget-box.repository";
import { BudgetBox, BudgetBoxSchema } from "@modules/budget-box/infra/entities/budget-box.schema";
import { BudgetBoxService } from "@modules/budget-box/infra/budget-box.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BaseConnection } from "@modules/shared/infra/connections/connection";
import CreateBudgetBoxUseCase from "@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.use-case";
import BudgetBoxQueryService from "@modules/budget-box/infra/services/queries/budget-box-query.service";
import GetBudgetBoxesForAuthUserUseCase from "@modules/budget-box/application/use-cases/get-budget-boxes-for-auth-user/get-budget-boxes-for-auth-user.use-case";
import AddReasonToBudgetBoxUseCase from "@modules/budget-box/application/use-cases/add-reason-to-budget-box/add-reason-to-budget-box.use-case";
import GetBudgetBoxByIdUseCase from "@modules/budget-box/application/use-cases/get-budget-box-by-id/get-budget-box-by-id.use-case";
import BudgetBoxToDomainMapper from "@modules/budget-box/infra/repo/budget-box.mapper";
import ReasonToDomainMapper from "@modules/budget-box/infra/repo/budget-box-reason.mapper";
import RemoveReasonFromBudgetBoxUseCase from "@modules/budget-box/application/use-cases/remove-reason-from-budget-box/remove-reason-from-budget-box.use-case";
import ChangeReasonDescriptionUseCase from "@modules/budget-box/application/use-cases/change-reason-description/change-reason-description.use-case";
import ChangeBudgetBoxPercentageUseCase from "@modules/budget-box/application/use-cases/change-budget-box-percentage/change-budget-box-percentage.use-case";
import ChangeBudgetBoxNameUseCase from "@modules/budget-box/application/use-cases/change-budget-box-name/change-budget-box-name.use-case";
import CanAllocatePercentageToBudgetBoxDomainService from "@modules/budget-box/domain/services/can-allocate-percentage-to-budget-box.domain-service";
import CanChangeBudgetBoxPercentageDomainService from "@modules/budget-box/domain/services/can-change-budget-box-percentage.domain-service";
import AfterBudgetBoxDeleted from "@modules/budget-box/domain/subscription/after-budget-box-deleted.subscription";
import DeleteBudgetBoxUseCase from "@modules/budget-box/application/use-cases/delete-budget-box/delete-budget-box.use-case";

@Module({
	imports: [
		BaseConnection,
		BudgetBoxConnection,
		SharedModule,
		MongooseModule.forFeature([
			{ name: BudgetBox.name, schema: BudgetBoxSchema }
		]),
	],
	providers: [
		CreateBudgetBoxUseCase,
		GetBudgetBoxesForAuthUserUseCase,
		AddReasonToBudgetBoxUseCase,
		GetBudgetBoxByIdUseCase,
		RemoveReasonFromBudgetBoxUseCase,
		ChangeReasonDescriptionUseCase,
		ChangeBudgetBoxPercentageUseCase,
		ChangeBudgetBoxNameUseCase,
		BudgetBoxResolver,
		BudgetBoxService,
		ReasonToDomainMapper,
		BudgetBoxToDomainMapper,
		{
			provide: 'BudgetBoxRepository',
			useClass: BudgetBoxRepository
		},
		{
			provide: 'BudgetBoxQueryService',
			useClass: BudgetBoxQueryService
		},
		CanAllocatePercentageToBudgetBoxDomainService,
		CanChangeBudgetBoxPercentageDomainService,
		DeleteBudgetBoxUseCase,
		AfterBudgetBoxDeleted
	],
	exports: []
})
export class BudgetBoxModule { }

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
		BudgetBoxResolver,
		BudgetBoxService,
		{
			provide: 'BudgetBoxRepository',
			useClass: BudgetBoxRepository
		},
		{
			provide: 'BudgetBoxQueryService',
			useClass: BudgetBoxQueryService
		}
	],
	exports: []
})
export class BudgetBoxModule { }

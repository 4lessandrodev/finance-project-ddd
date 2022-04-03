import BudgetBoxResolver from "@modules/budget-box/infra/resolver/budget-box.resolver";
import BudgetBoxRepository from "@modules/budget-box/infra/repo/budget-box.repository";
import { BudgetBox, BudgetBoxSchema } from "@modules/budget-box/infra/entities/budget-box.schema";
import { BudgetBoxService } from "@modules/budget-box/infra/budget-box.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
	CreateBudgetBoxUseCase
} from "@modules/budget-box/application/use-cases/create-budget-box/create-budget-box.use-case";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: BudgetBox.name, schema: BudgetBoxSchema }
		]),
	],
	providers: [
		CreateBudgetBoxUseCase,
		BudgetBoxResolver,
		BudgetBoxService,
		{
			provide: 'BudgetBoxRepository',
			useClass: BudgetBoxRepository
		}
	],
	exports: []
})
export class BudgetBoxModule { }

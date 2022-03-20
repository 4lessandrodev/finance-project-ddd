import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BudgetBoxService } from "./budget-box.service";
import { BudgetBox, BudgetBoxSchema } from "./entities/budget-box.schema";
import BudgetBoxRepository from "./repo/budget-box.repository";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: BudgetBox.name, schema: BudgetBoxSchema }
		]),
	],
	providers: [
		BudgetBoxService,
		{
			provide: 'BudgetBoxRepository',
			useClass: BudgetBoxRepository
		}
	],
	exports: []
})
export class BudgetBoxModule { }

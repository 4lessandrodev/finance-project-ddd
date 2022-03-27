import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BudgetBoxService } from "./budget-box.service";
import { BudgetBox, BudgetBoxSchema } from "./entities/budget-box.schema";
import BudgetBoxRepository from "./repo/budget-box.repository";
import BudgetBoxResolver from "./resolver/budget-box.resolver";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: BudgetBox.name, schema: BudgetBoxSchema }
		]),
	],
	providers: [
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

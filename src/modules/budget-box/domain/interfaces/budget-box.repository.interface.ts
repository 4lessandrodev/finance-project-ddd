import IBudgetBox from "@modules/shared/interfaces/budget-box-model.interface";
import { IBaseRepository } from "types-ddd";
import BudgetBoxAggregate from "../budget-box.aggregate";

export type IBudgetBoxRepository = IBaseRepository<BudgetBoxAggregate, IBudgetBox>;

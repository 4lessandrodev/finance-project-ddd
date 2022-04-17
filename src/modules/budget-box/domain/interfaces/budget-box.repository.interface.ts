import { IBudgetBox } from "@shared/index";
import { IBaseRepository } from "types-ddd";
import BudgetBoxAggregate from "../budget-box.aggregate";

export type IBudgetBoxRepository = IBaseRepository<BudgetBoxAggregate, IBudgetBox>;

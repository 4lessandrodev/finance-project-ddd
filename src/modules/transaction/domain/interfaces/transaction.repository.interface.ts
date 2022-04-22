import { ITransaction } from "@modules/shared";
import { IBaseRepository } from "types-ddd";
import TransactionAggregate from "../transaction.aggregate";

export type ITransactionRepository = IBaseRepository<TransactionAggregate, ITransaction>;

export default ITransactionRepository;

import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionService {
	async capitalInflowPosting () {
		return true;
	}
}

export default TransactionService;

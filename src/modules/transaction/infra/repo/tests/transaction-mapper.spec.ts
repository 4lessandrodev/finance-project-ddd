import TransactionMock from "@modules/transaction/domain/tests/mock/transaction.mock";
import TransactionCalculationToDomain from "../transaction-calculation.mapper";
import TransactionToDomainMapper from "../transaction.mapper";

describe('transaction.mapper', () => {

	const mock = new TransactionMock();
	const calcMapper = new TransactionCalculationToDomain();
	const mapper = new TransactionToDomainMapper(calcMapper);

	it('should translate to domain with success', () => {
		const model = mock.model();
		const result = mapper.map(model);
		const generated = result.getResult().toObject();
		
		expect(result.isSuccess).toBeTruthy();
		expect(generated).toEqual(model);
		expect(generated).toMatchSnapshot();
		
	});
});

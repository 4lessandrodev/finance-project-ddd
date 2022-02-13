import { ErrorMessages } from '@shared/index';
import { TransactionTypeValueObject } from '../transaction-type.value-object';

describe('transaction-type.value-object', () => {
	it('should create a valid transaction-type', () => {
		const result = TransactionTypeValueObject.create('ENTRADA');

		expect(result.isSuccess).toBe(true);
	});

	it('should create a valid transaction-type', () => {
		const result = TransactionTypeValueObject.create('saida' as any);

		expect(result.isSuccess).toBe(true);
		expect(result.getResult().value).toBe('SAIDA');
	});

	it('should fail if provide an invalid transaction-type as string', () => {
		const result = TransactionTypeValueObject.create('INVALID_TYPE' as any);

		expect(result.isSuccess).toBe(false);
		expect(result.error).toBe(ErrorMessages.INVALID_ENUM_TRANSACTION_TYPE);
	});
});

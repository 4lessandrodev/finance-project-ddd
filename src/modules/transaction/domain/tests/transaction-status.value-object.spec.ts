import { ErrorMessages } from '@shared/index';
import { TransactionStatusValueObject } from '../transaction-status.value-object';

describe('transaction-status.value-object', () => {
	it('should create a valid transaction-status', () => {
		const result = TransactionStatusValueObject.create('CONCLUIDO');

		expect(result.isSuccess).toBe(true);
	});

	it('should create a valid transaction-status', () => {
		const result = TransactionStatusValueObject.create('pendente' as any);

		expect(result.isSuccess).toBe(true);
		expect(result.getResult().value).toBe('PENDENTE');
	});

	it('should fail if provide an invalid transaction-status as string', () => {
		const result = TransactionStatusValueObject.create('INVALID_STATUS' as any);

		expect(result.isSuccess).toBe(false);
		expect(result.error).toBe(ErrorMessages.INVALID_ENUM_TRANSACTION_STATUS);
	});
});

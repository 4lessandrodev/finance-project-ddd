import { TransactionAggregate } from '../transaction.aggregate';
import { CurrencyValueObject, DateValueObject, DomainId } from 'types-ddd';
import { CURRENCY } from '@config/env';
import { TransactionTypeValueObject } from '../transaction-type.value-object';
import { TransactionStatusValueObject } from '../transaction-status.value-object';
import { TransactionNoteValueObject } from '../transaction-note.value-object';
import { AttachmentPathValueObject } from '../attachment-path.value-object';
import { TransactionCalculationValueObject } from '../transaction-calculations.value-object';

describe('transaction.aggregate', () => {

	const currency = CurrencyValueObject.create({
		currency: CURRENCY,
		value: 100
	}).getResult();

	it('should create a valid transaction', () => {
		const transaction = TransactionAggregate.create({
			ID: DomainId.create(),
			userId: DomainId.create(),
			reasonId: DomainId.create(),
			paymentDate: DateValueObject.create(new Date()).getResult(),
			transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
			status: TransactionStatusValueObject.create('PENDENTE').getResult(),
			note: undefined,
			attachment: undefined,
			transactionCalculations: [
				TransactionCalculationValueObject.create({
					budgetBoxId: DomainId.create('valid_id'),
					currency,
				}).getResult(),
			],
		});
		expect(transaction.isSuccess).toBe(true);
		expect(transaction.getResult().note).toBeNull();
		expect(transaction.getResult().attachment).toBeNull();
	});

	it('should create a valid transaction with updated total', () => {
		const transaction = TransactionAggregate.create({
			ID: DomainId.create(),
			userId: DomainId.create(),
			reasonId: DomainId.create(),
			paymentDate: DateValueObject.create(new Date()).getResult(),
			transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
			status: TransactionStatusValueObject.create('PENDENTE').getResult(),
			note: TransactionNoteValueObject.create('valid_description').getResult(),
			attachment: AttachmentPathValueObject.create(
				'https://aws.s3.com/bucket-askjdas656/file.pdf',
			).getResult(),
			transactionCalculations: [
				TransactionCalculationValueObject.create({
					budgetBoxId: DomainId.create('valid_id'),
					currency,
				}).getResult(),
				TransactionCalculationValueObject.create({
					budgetBoxId: DomainId.create('valid_id'),
					currency,
				}).getResult(),
			],
		});
		expect(transaction.isSuccess).toBe(true);
		expect(transaction.getResult().totalValue).toBe(200);
	});

	it('should create a valid transaction with provided id ', () => {

		const date = new Date('2020-01-01 00:00:00');

		const transaction = TransactionAggregate.create(
			{
				ID: DomainId.create('Valid_id_a'),
				userId: DomainId.create('valid_id_b'),
				reasonId: DomainId.create('valid_id_c'),
				paymentDate: DateValueObject.create(date).getResult(),
				transactionType: TransactionTypeValueObject.
					create('ENTRADA').getResult(),
				status: TransactionStatusValueObject
					.create('PENDENTE').getResult(),
				note: TransactionNoteValueObject
					.create('valid_description').getResult(),
				attachment: AttachmentPathValueObject
					.create('https://aws.s3.com/bucket-askjdas656/file.pdf').getResult(),
				transactionCalculations: [
					TransactionCalculationValueObject.create({
						budgetBoxId: DomainId.create('valid_id_d'),
						currency,
					}).getResult(),
					TransactionCalculationValueObject.create({
						budgetBoxId: DomainId.create('valid_id_e'),
						currency,
					}).getResult(),
				],
				createdAt: date,
				updatedAt: date
			}
		);

		expect(transaction.getResult().toObject()).toMatchSnapshot();
		expect(transaction.isSuccess).toBe(true);
		expect(transaction.getResult().id.toValue()).toBe('Valid_id_a');
		expect(transaction.getResult().note?.value).toBe('valid_description');
		expect(transaction.getResult().attachment?.value).toBe('https://aws.s3.com/bucket-askjdas656/file.pdf');
	});
});

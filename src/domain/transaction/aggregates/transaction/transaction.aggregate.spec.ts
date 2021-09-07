import { DateValueObject } from '@shared/index';
import {
	AttachmentPathValueObject,
	TransactionCalculationValueObject,
	TransactionNoteValueObject,
	TransactionStatusValueObject,
	TransactionTypeValueObject,
} from '@domain/transaction/value-objects';
import { TransactionAggregate } from './transaction.aggregate';
import { CurrencyValueObject, DomainId } from 'types-ddd';
import { CURRENCY } from '@config/env';

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
			note: TransactionNoteValueObject.create('valid_description').getResult(),
			attachment: AttachmentPathValueObject.create(
				'https://aws.s3.com/bucket-askjdas656/file.pdf',
			).getResult(),
			transactionCalculations: [
				TransactionCalculationValueObject.create({
					budgetBoxId: DomainId.create('valid_id'),
					currency,
				}).getResult(),
			],
		});
		expect(transaction.isSuccess).toBe(true);
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
		const transaction = TransactionAggregate.create(
			{
				ID: DomainId.create('Valid_id'),
				userId: DomainId.create(),
				reasonId: DomainId.create(),
				paymentDate: DateValueObject.create(new Date()).getResult(),
				transactionType: TransactionTypeValueObject.create(
					'ENTRADA',
				).getResult(),
				status: TransactionStatusValueObject.create('PENDENTE').getResult(),
				note: TransactionNoteValueObject.create(
					'valid_description',
				).getResult(),
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
			}
		);
		expect(transaction.isSuccess).toBe(true);
		expect(transaction.getResult().id.toValue()).toBe('Valid_id');
	});
});

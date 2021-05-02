import {
  BudgetIdValueObject,
  ReasonIdValueObject,
} from '@domain/budget-box/value-objects';
import { DateValueObject } from '@shared/index';
import { UserIdValueObject } from '@domain/user/value-objects';
import {
  AttachmentPathValueObject,
  TransactionCalculationValueObject,
  TransactionNoteValueObject,
  TransactionStatusValueObject,
  TransactionTypeValueObject,
} from '@domain/transaction/value-objects';
import { TransactionAggregate } from './transaction.aggregate';
import { UniqueEntityID } from 'types-ddd';

describe('transaction.aggregate', () => {
  it('should create a valid transaction', () => {
    const transaction = TransactionAggregate.create({
      userId: UserIdValueObject.create().getResult(),
      reasonId: ReasonIdValueObject.create().getResult(),
      paymentDate: DateValueObject.create(new Date()).getResult(),
      transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
      status: TransactionStatusValueObject.create('PENDENTE').getResult(),
      note: TransactionNoteValueObject.create('valid_description').getResult(),
      attachment: AttachmentPathValueObject.create(
        'https://aws.s3.com/bucket-askjdas656/file.pdf',
      ).getResult(),
      transactionCalculations: [
        TransactionCalculationValueObject.create({
          budgetBoxId: BudgetIdValueObject.create(
            new UniqueEntityID('valid_id'),
          ).getResult(),
          value: 100,
        }).getResult(),
      ],
    });
    expect(transaction.isSuccess).toBe(true);
  });

  it('should create a valid transaction with updated total', () => {
    const transaction = TransactionAggregate.create({
      userId: UserIdValueObject.create().getResult(),
      reasonId: ReasonIdValueObject.create().getResult(),
      paymentDate: DateValueObject.create(new Date()).getResult(),
      transactionType: TransactionTypeValueObject.create('ENTRADA').getResult(),
      status: TransactionStatusValueObject.create('PENDENTE').getResult(),
      note: TransactionNoteValueObject.create('valid_description').getResult(),
      attachment: AttachmentPathValueObject.create(
        'https://aws.s3.com/bucket-askjdas656/file.pdf',
      ).getResult(),
      transactionCalculations: [
        TransactionCalculationValueObject.create({
          budgetBoxId: BudgetIdValueObject.create(
            new UniqueEntityID('valid_id'),
          ).getResult(),
          value: 100,
        }).getResult(),
        TransactionCalculationValueObject.create({
          budgetBoxId: BudgetIdValueObject.create(
            new UniqueEntityID('valid_id'),
          ).getResult(),
          value: 100,
        }).getResult(),
      ],
    });
    expect(transaction.isSuccess).toBe(true);
    expect(transaction.getResult().totalValue).toBe(200);
  });

  it('should create a valid transaction with provided id ', () => {
    const transaction = TransactionAggregate.create(
      {
        userId: UserIdValueObject.create().getResult(),
        reasonId: ReasonIdValueObject.create().getResult(),
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
            budgetBoxId: BudgetIdValueObject.create(
              new UniqueEntityID('valid_id'),
            ).getResult(),
            value: 100,
          }).getResult(),
          TransactionCalculationValueObject.create({
            budgetBoxId: BudgetIdValueObject.create(
              new UniqueEntityID('valid_id'),
            ).getResult(),
            value: 100,
          }).getResult(),
        ],
      },
      new UniqueEntityID('Valid_id'),
    );
    expect(transaction.isSuccess).toBe(true);
    expect(transaction.getResult().id.toValue()).toBe('Valid_id');
  });
});

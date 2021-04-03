import {
  AggregateRoot,
  DateValueObject,
  ReasonIdValueObject,
  Result,
  UniqueEntityID,
} from '../../../shared';
import { UserIdValueObject } from '../../../user/value-objects';
import {
  AttachmentPathValueObject,
  TransactionCalculationValueObject,
  TransactionNoteValueObject,
  TransactionStatusValueObject,
  TransactionTypeValueObject,
} from '../../value-objects';

export interface TransactionAggregateProps {
  userId: UserIdValueObject;
  reasonId: ReasonIdValueObject;
  paymentDate: DateValueObject;
  transactionType: TransactionTypeValueObject;
  status: TransactionStatusValueObject;
  transactionCalculations: TransactionCalculationValueObject[];
  note?: TransactionNoteValueObject;
  attachment?: AttachmentPathValueObject;
}

export class TransactionAggregate extends AggregateRoot<TransactionAggregateProps> {
  private _totalValue: number;
  private constructor(props: TransactionAggregateProps, id?: UniqueEntityID) {
    super(props, id);
    this._totalValue = 0;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  get userId(): UserIdValueObject {
    return this.props.userId;
  }

  get reasonId(): ReasonIdValueObject {
    return this.props.reasonId;
  }

  get paymentDate(): DateValueObject {
    return this.props.paymentDate;
  }

  get transactionType(): TransactionTypeValueObject {
    return this.props.transactionType;
  }

  get status(): TransactionStatusValueObject {
    return this.props.status;
  }

  get transactionCalculations(): TransactionCalculationValueObject[] {
    return this.props.transactionCalculations;
  }

  get note(): TransactionNoteValueObject | null {
    return this.props.note ?? null;
  }

  get attachment(): AttachmentPathValueObject | null {
    return this.props.attachment ?? null;
  }

  private calculateTotal(): number {
    const total = this.props.transactionCalculations.reduce(
      (total, calc) => calc.calculation.value + total,
      0,
    );
    this._totalValue = total;
    return total;
  }

  public static create(
    props: TransactionAggregateProps,
    id?: UniqueEntityID,
  ): Result<TransactionAggregate> {
    const transaction = new TransactionAggregate(props, id);
    transaction.calculateTotal();
    return Result.ok<TransactionAggregate>(transaction);
  }
}

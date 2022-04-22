import { ErrorMessages } from '@modules/shared';
import { TransactionNoteValueObject } from '../transaction-note.value-object';

describe('transaction-note.value-object', () => {
	it('should create a valid note', () => {
		const note = TransactionNoteValueObject.create('One_valid_note');
		expect(note.isSuccess).toBe(true);
		expect(note.getResult().value).toBe('One_valid_note');
	});

	it('should fail if provide string greatter than 144 char', () => {
		const note = TransactionNoteValueObject.create(`Sequi hic unde qui ut vero aut.
    Enim nulla dicta asperiores.Eius dicta delectus natus in sit omnis eveniet ut sapiente.Magnam et magnam.
    Consectetur ipsam minus rerum non.`);

		expect(note.isSuccess).toBe(false);
		expect(note.error).toBe(ErrorMessages.INVALID_TRANSACTION_NOTE_LENGTH);
	});
});

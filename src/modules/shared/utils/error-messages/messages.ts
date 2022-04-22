import {
	BUDGET_DESCRIPTION_MAX_LENGTH,
	BUDGET_DESCRIPTION_MIN_LENGTH
} from "@modules/budget-box/domain/budget-description.value-object";
import {
	REASON_DESCRIPTION_MAX_LENGTH,
	REASON_DESCRIPTION_MIN_LENGTH
} from "@modules/budget-box/domain/reason-description.value-object";
import { TRANSACTION_CALCULATION_MIN_VALUE } from "@modules/transaction/domain/transaction-calculations.value-object";
import { TRANSACTION_NOTE_MAX_LENGTH } from "@modules/transaction/domain/transaction-note.value-object";
import {
	TRANSACTION_DESCRIPTION_MAX_LENGTH, TRANSACTION_DESCRIPTION_MIN_LENGTH
} from "@modules/transaction/domain/transaction-reason.value-object";


export const ErrorMessages = {
	INVALID_BUDGET_DESCRIPTION_LENGTH: `Invalid budget description length, must have min ${BUDGET_DESCRIPTION_MIN_LENGTH} and max ${BUDGET_DESCRIPTION_MAX_LENGTH} characters`,
	INVALID_PASSWORD_LENGTH: `Password must have min 8 char and max 18 char`,
	INVALID_REASON_DESCRIPTION_LENGTH: `Invalid reason description length, must have min ${REASON_DESCRIPTION_MIN_LENGTH} and max ${REASON_DESCRIPTION_MAX_LENGTH} characters`,
	INVALID_TRANSACTION_REASON_DESCRIPTION_LENGTH: `Invalid reason description length, must have min ${TRANSACTION_DESCRIPTION_MIN_LENGTH} and max ${TRANSACTION_DESCRIPTION_MAX_LENGTH} characters`,
	INVALID_TRANSACTION_CALCULATION_VALUE: `Value must be greater or equal to ${TRANSACTION_CALCULATION_MIN_VALUE}`,
	INVALID_TRANSACTION_NOTE_LENGTH: `Note value must have max ${TRANSACTION_NOTE_MAX_LENGTH} characters`,
	INVALID_PERCENTAGE_VALUE: 'Invalid range value to percentage',
	INVALID_ATTACHMENT_PATH: 'Invalid attachment path or url',
	INVALID_ENUM_TRANSACTION_STATUS: 'Invalid transaction enum status',
	INVALID_ENUM_TRANSACTION_TYPE: 'Invalid transaction enum type',
	INVALID_EMAIL: 'Invalid email',
	INVALID_IP: 'Invalid ip',
	INVALID_CREDENTIALS: 'Invalid Credentials'
};

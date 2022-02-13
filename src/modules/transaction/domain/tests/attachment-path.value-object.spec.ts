import { ErrorMessages } from '@shared/index';
import { AttachmentPathValueObject } from '../attachment-path.value-object';

describe('attachment-path.value-object', () => {
	it('should create a valid attachment path if provide an url', () => {
		const validUrl = 'https://tyreek.org';
		const attachment = AttachmentPathValueObject.create(validUrl);
		expect(attachment.isSuccess).toBe(true);
		expect(attachment.getResult().value).toBe(validUrl);
	});

	it('should fail if provide an invalid url', () => {
		const attachment = AttachmentPathValueObject.create('invalid_url');
		expect(attachment.isSuccess).toBe(false);
		expect(attachment.error).toBe(ErrorMessages.INVALID_ATTACHMENT_PATH);
	});

	it('should create a valid attachment path if provide a directory', () => {
		const attachment = AttachmentPathValueObject.create(
			'./folder/public/image.jpeg',
		);
		expect(attachment.isSuccess).toBe(true);
		expect(attachment.getResult().value).toBe('./folder/public/image.jpeg');
	});
});

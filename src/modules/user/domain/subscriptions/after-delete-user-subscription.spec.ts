import { IDomainService } from "@modules/shared";
import { Logger, Result } from "types-ddd";
import UserAccountDeletedEvent from "../events/delete-user-account.event";
import UserMock from "../tests/mock/user.mock";
import AfterDeleteUserAccount from "./after-delete-user-account.subscription";

describe('after-delete-user.subscription', () => {

	let service: IDomainService<{ userId: string }, Result<boolean>> = {
		execute: jest.fn()
	};

	const useMock = new UserMock();

	beforeEach(() => {
		service = {
			execute: jest.fn()
		};
	});

	it('should dispatch with success', async () => {

		const user = useMock.domain().getResult();

		jest.spyOn(service, 'execute').mockResolvedValue(Result.ok(true));
		const serviceSpy = jest.spyOn(service, 'execute');
		const loggerSpy = jest.spyOn(Logger, 'info');

		const event = new AfterDeleteUserAccount(service, service);

		await event.dispatch(new UserAccountDeletedEvent(user));
		
		expect(serviceSpy).toHaveBeenCalled();
		expect(loggerSpy).toHaveBeenCalled();
	});

	it('should dispatch with error', async () => {

		const user = useMock.domain().getResult();

		jest.spyOn(service, 'execute').mockResolvedValue(Result.fail('error'));
		const serviceSpy = jest.spyOn(service, 'execute');
		const loggerSpy = jest.spyOn(Logger, 'error');

		const event = new AfterDeleteUserAccount(service, service);

		await event.dispatch(new UserAccountDeletedEvent(user));
		
		expect(serviceSpy).toHaveBeenCalled();
		expect(loggerSpy).toHaveBeenCalled();
	});
});

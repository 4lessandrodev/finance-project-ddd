import { IUseCase, Result } from "types-ddd";
import BaseProxy from "../base.proxy";

describe('base.proxy', () => {
	
	const useCaseToExecute: IUseCase<string, Result<void>> = { execute: jest.fn() };
	const canExecute: IUseCase<string, Result<boolean>> = { execute: jest.fn() };

	it('should cannot execute if canExecute function returns fail', async () => {

		jest.spyOn(canExecute, 'execute').mockResolvedValueOnce(Result.fail('cannot execute'));
		const useCase = jest.spyOn(useCaseToExecute, 'execute');

		const proxy = new BaseProxy(canExecute, useCaseToExecute);

		const result = await proxy.execute('invalid_email@domain.com');

		expect(result.isFailure).toBeTruthy();
		expect(useCase).not.toBeCalled();
	});

	it('should cannot execute if canExecute function returns false', async () => {

		jest.spyOn(canExecute, 'execute').mockResolvedValueOnce(Result.ok(false));
		const useCase = jest.spyOn(useCaseToExecute, 'execute');

		const proxy = new BaseProxy(canExecute, useCaseToExecute);

		const result = await proxy.execute('invalid_email@domain.com');

		expect(result.isFailure).toBeTruthy();
		expect(useCase).not.toBeCalled();
	});

	it('should can execute with success if canExecute function returns true', async () => {

		jest.spyOn(canExecute, 'execute').mockResolvedValueOnce(Result.ok(true));
		jest.spyOn(useCaseToExecute, 'execute').mockResolvedValueOnce(Result.ok('valid_email@domain.com'));

		const proxy = new BaseProxy(canExecute, useCaseToExecute);

		const result = await proxy.execute('valid_email@domain.com');

		expect(result.isSuccess).toBeTruthy();
	});

});
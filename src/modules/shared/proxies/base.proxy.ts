import { IUseCase, Result, TSProxy } from "types-ddd";

export class BaseProxy<D, T> extends TSProxy<D, T, string> { 
	constructor (
		canExecute: IUseCase<D, Result<boolean>>,
		useCase: IUseCase<D, Result<T>>,
	) {
		super({
			execute: useCase,
			canExecute: canExecute,
		});
	}
};

export default BaseProxy;

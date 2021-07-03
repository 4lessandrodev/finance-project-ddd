/* eslint-disable  */
//@ts-nocheck
import { IDomainEvent } from './IDomainEvent';

export interface IHandle<IDomainEvent> {
	setupSubscriptions (): void;
}

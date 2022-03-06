import { Result } from "types-ddd";

export interface IMockEntity<Domain, Model> {
	domain(props?: Partial<Model>): Result<Domain>;
	model(props?: Partial<Model>): Model;
}

export default IMockEntity;

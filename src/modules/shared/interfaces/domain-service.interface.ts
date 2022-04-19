export interface IDomainService<T, D> {
	execute(data: T): Promise<D>;
}

export default IDomainService;

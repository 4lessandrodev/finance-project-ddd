/**
 * `TargetPersistence` as Entity to persist on database and
 * `DomainAggreate` as Aggregate entity from domain
 * @method toPersistence receives a `DomainAggreate` target and transform it on `TargetPersistence`
 * @method toDomain receives a `TargetPersistence` target and transform it on `DomainAggreate`
 *
 */
export interface MapperInterface<TargetPersistence, DomainAggreate> {
  toPersistence: (target: DomainAggreate) => TargetPersistence;
  toDomain: (target: TargetPersistence) => DomainAggreate;
}

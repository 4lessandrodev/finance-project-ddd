export interface MapperInterface<TargetPersistence, DomainAggreate> {
  toPersistence: (target: DomainAggreate) => TargetPersistence;
  toDomain: (target: TargetPersistence) => DomainAggreate;
}

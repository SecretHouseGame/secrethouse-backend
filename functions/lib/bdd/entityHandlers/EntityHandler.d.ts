import { EntityManager } from "@mikro-orm/mysql";
import { AnyEntity, EntityName, EntityRepository } from "@mikro-orm/core";
export declare class EntityHandler {
    em: EntityManager;
    repository: EntityRepository<AnyEntity>;
    constructor(entityManager: EntityManager, entityName: EntityName<AnyEntity>);
}

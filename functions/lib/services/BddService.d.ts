import { EntityManager } from "@mikro-orm/mysql";
import { UserHandler } from "../bdd/entityHandlers";
export declare class BddService {
    static entityManager: EntityManager;
    private static user;
    private static orm;
    static createOrm(): Promise<void>;
    static get userHandler(): UserHandler;
}

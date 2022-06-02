import { EntityManager } from "@mikro-orm/mysql";
export declare class BddService {
    private static em;
    private static orm;
    static get entityManager(): EntityManager;
    private static createOrm;
}

import { EntityHandler } from "./EntityHandler";
import { EntityManager } from "@mikro-orm/mysql";
import { User, UserRole } from "../entities";
export declare class UserHandler extends EntityHandler {
    constructor(entityManager: EntityManager);
    createUser(payload: any, role?: UserRole): Promise<User | null>;
    findUserById(id: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").AnyEntity<any>, never> | null>;
    findUserByEmail(email: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").AnyEntity<any>, never> | null>;
    findUserByUsername(username: string): Promise<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").AnyEntity<any>, never> | null>;
}

import { EntityManager } from "@mikro-orm/knex";
import { Player } from "../entities/Player";
import {EntityHandler} from "./EntityHandler";

export class PlayerHandler extends EntityHandler {
    constructor(entityManager: EntityManager) {
        super(entityManager, Player);
    }
}
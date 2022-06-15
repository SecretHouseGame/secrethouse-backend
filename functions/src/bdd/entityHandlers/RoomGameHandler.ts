import {Game, RoomGame, Room} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {EntityHandler} from "./EntityHandler";

export class RoomGameHandler extends EntityHandler { 
    constructor(entityManager: EntityManager) {
        super(entityManager, RoomGame)
    }
}
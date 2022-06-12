import {EntityHandler} from "./EntityHandler";
import {Room} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";

export class RoomHandler extends EntityHandler {
    constructor(entityManager: EntityManager) {
        super(entityManager, Room);
    }

    async createRoom(payload: any) {
        
    }
}
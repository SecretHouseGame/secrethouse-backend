import {Game, RoomGame, Room} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {EntityHandler} from "./EntityHandler";
import {castToRoomGameData} from "../../types/request/bodyData";

export class RoomGameHandler extends EntityHandler { 
    constructor(entityManager: EntityManager) {
        super(entityManager, RoomGame)
    }
    
    async createRoomGame(payload: any, game: Game, room: Room) {
        const RoomGameData = castToRoomGameData(payload);
        
    }
}
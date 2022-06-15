import {EntityHandler} from "./EntityHandler";
import {Event, EventStatus, EventTypes, Game, Player, User} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {castToEventData} from "../../types/request/bodyData";

export class EventHandler extends EntityHandler {
    constructor(entityManager: EntityManager) {
        super(entityManager, Event);
    }

    async createEvent(payload: any, player: Player, user: User, game: Game, eventType: EventTypes, eventStatus: EventStatus) {
        const eventData = castToEventData(payload);
        
        if (eventData === null) return null;

        const event = new Event(eventData, player, user, game, eventType, eventStatus);
        await this.repository.persistAndFlush(event);
        return event;
    }

    async findEventById(id: number) {
        return await this.repository.findOne({id: id});
    }
}
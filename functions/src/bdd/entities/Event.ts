import {Entity, Enum, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import { Player } from "./Player";

@Entity()
export class Event{
    @PrimaryKey()
    id!: number;

    @Property()
    created_at: Date = new Date();

    @Property()
    updated_at: Date = new Date();

    @Property()
    isConfirmed: boolean = false;

    @Property()
    content!: string;

    @ManyToOne()
    player_id!: Player;

    @Enum(() => EventTypes)
    type!: string;

    @Enum(() => EventStatus)
    status!: string;

    static castToEventTypes(value: string): EventTypes {
        let type: EventTypes = EventTypes.EVENT;
        try {
            const typeKey: keyof typeof EventTypes = value as keyof typeof EventTypes;
            type = EventTypes[typeKey];
        } catch (e) {
            console.error(e);
            return EventTypes.EVENT;
        }
        return type;
    }

    static castToEventStatus(value: string): EventStatus {
        let type: EventStatus = EventStatus.CREATED;
        try {
            const typeKey: keyof typeof EventStatus = value as keyof typeof EventStatus;
            type = EventStatus[typeKey];
        } catch (e) {
            console.error(e);
            return EventStatus.CREATED;
        }
        return type;
    }
}



export enum EventTypes{
    "EVENT" = "event",
    "NOMINATION" = "nomination",
    "BUZZ" = "buzz",
    "ELIMINATION" = "elimination"
}

export enum EventStatus{
    "CREATED" = "created",
    "STARTED" = "started",
    "ENDED" = "ended",
    "CANCELLED" = "cancelled",
}
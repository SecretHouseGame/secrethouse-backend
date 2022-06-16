import {Entity, ManyToOne, PrimaryKeyType, Property} from "@mikro-orm/core";
import {Room} from "./Room";
import {Game} from "./Game";

@Entity()
export class RoomGame{
    @ManyToOne({ primary: true })
    room!: Room;

    @ManyToOne({ primary: true })
    game!: Game;

    @Property({default: false})
    isLocked: boolean = false;

    [PrimaryKeyType]?: [number, number];
}
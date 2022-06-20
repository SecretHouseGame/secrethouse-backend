import {Entity, Enum, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {BuzzData} from "../../types/request/bodyData/BuzzData";
import {Event} from "./Event";
import {Player} from "./Player";

@Entity()
export class Buzz {
    @PrimaryKey()
      id!: number;

    @ManyToOne()
      buzzer!: Player;

    @ManyToOne()
      event!: Event;

    @ManyToOne()
      target!: Player;

    @Property()
      createdAt: Date = new Date();

    @Property()
      updatedAt: Date = new Date();

    @Property({default: false})
      isConfirmed = false;

    @Property()
      secret!: string;

    @Enum(() => BuzzStatus)
      status!: string;

    constructor(buzzData: BuzzData, buzzer: Player, target: Player, event: Event, status: BuzzStatus) {
      this.buzzer = buzzer;
      this.event = event;
      this.target = target;
      this.isConfirmed = buzzData.isConfirmed;
      this.secret = buzzData.secret;
      this.status = status;
    }

    static castToBuzzStatus(value: string): BuzzStatus {
      let status: BuzzStatus = BuzzStatus.CREATED;
      try {
        const statusKey: keyof typeof BuzzStatus = value as keyof typeof BuzzStatus;
        status = BuzzStatus[statusKey];
      } catch (e) {
        console.error(e);
        return BuzzStatus.CREATED;
      }
      return status;
    }
}


export enum BuzzStatus{
    "CREATED" = "created",
    "STARTED" = "started",
    "CONFIRMED" = "confirmed",
    "CORRECT" = "correct",
    "SEMI-CORRECT" = "semi-correct",
    "WRONG" = "wrong",
    "CANCELLED" = "cancelled",
}

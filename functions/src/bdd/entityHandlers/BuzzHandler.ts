import {EntityHandler} from "./EntityHandler";
import {Buzz, BuzzStatus, Event, Player} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {wrap} from "@mikro-orm/core";
import {castToBuzzData} from "../../types/request/bodyData";

export class BuzzHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Buzz);
  }

  async createBuzz(payload: any, buzzer: Player, target: Player, event: Event, status: BuzzStatus) {
    const buzzData = castToBuzzData(payload);

    if (buzzData === null) {
      return null;
    }

    const buzz = new Buzz(buzzData, buzzer, target, event, status);

    await this.repository.persistAndFlush(buzz);
    return buzz;
  }

  async findBuzzById(id: number) {
    return await this.repository.findOne({id: id});
  }

  async update(payload: any, id: number) {
    const buzz = await this.repository.findOne({id: id});

    if (!buzz) {
      return null;
    }

    wrap(buzz).assign(payload);
    await this.repository.flush();

    return buzz;
  }
}

import {EntityManager} from "@mikro-orm/knex";
import {castToPlayerData} from "../../types/request/bodyData/PlayerData";
import {Game, Genders, User} from "../entities";
import {Player} from "../entities/Player";
import {EntityHandler} from "./EntityHandler";
import {LoadStrategy} from "@mikro-orm/core";

export class PlayerHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Player);
  }

  async createPlayer(payload: any, user: User, game: Game, gender: Genders) {
    const playerData = castToPlayerData(payload);

    if (playerData === null) return null;

    const player = new Player(playerData, user, game, gender);
    await this.repository.persistAndFlush(player);
    return player;
  }

  async findPlayerById(id: number) {
    return await this.repository.findOne({id: id});
  }

  async findPlayerByUser(id: number) {
    return await this.repository.findOne(
        {user: id, game: {endDate: {$eq: null}}},
        {
          populate: ["game"],
          strategy: LoadStrategy.JOINED,
        },
    );
  }

  async findPlayerByGame(id: number) {
    return await this.repository.find({game: id});
  }
}

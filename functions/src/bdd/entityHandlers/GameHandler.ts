import {EntityHandler} from "./EntityHandler";
import {Game, DelayUnities, User} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {castToGameData} from "../../types/request/bodyData";

export class GameHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Game);
  }

  async createGame(payload: any, user: User, eventIntervalUnity: DelayUnities, eliminationDelayUnity: DelayUnities) {
    const gameData = castToGameData(payload);

    if (gameData === null) return null;
    const game = new Game(gameData, user, eventIntervalUnity, eliminationDelayUnity);
    await this.repository.persistAndFlush(game);
    return game;
  }

  async findGameById(id:number) {
    return await this.repository.findOne({id: id});
  }
}

import {EntityManager, MySqlDriver} from "@mikro-orm/mysql";
import {MikroORM, Options} from "@mikro-orm/core";
import {GameHandler, RoomHandler, UserHandler} from "../bdd/entityHandlers";
import mikroOrmConfig from "../mikroOrm.config";

export class BddService {
  static entityManager: EntityManager;
  private static user: UserHandler;
  private static orm: MikroORM<MySqlDriver>;
  private static game: GameHandler;
  private static room: RoomHandler;

  static async createOrm() {
    this.orm = await MikroORM.init<MySqlDriver>(<Options<MySqlDriver>>mikroOrmConfig());
    this.entityManager = this.orm.em as EntityManager;
  }

  static get userHandler(): UserHandler {
    if (this.user == null) this.user = new UserHandler(this.entityManager);
    return this.user;
  }

  static get gameHandler(): GameHandler {
    if (this.game == null) this.game = new GameHandler(this.entityManager);
    return this.game;
  }

  static get roomHandler(): RoomHandler {
    if (this.room == null) this.room = new RoomHandler(this.entityManager);
    return this.room;
  }
}

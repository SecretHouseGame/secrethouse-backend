import {Game, User} from "../bdd/entities";
import {EntityManager, MySqlDriver} from "@mikro-orm/mysql";
import {MikroORM} from "@mikro-orm/core";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {UserHandler, GameHandler} from "../bdd/entityHandlers";

export class BddService {
  static entityManager: EntityManager;
  private static user: UserHandler;
  private static orm: MikroORM<MySqlDriver>;
  private static game: GameHandler;

  static async createOrm() {
    this.orm = await MikroORM.init<MySqlDriver>({
      entities: [User, Game],
      dbName: "test",
      host: "nn26812-001.dbaas.ovh.net",
      user: "secrethouse",
      password: "03c4s4wC3jqLaCgYIARAAGAMSNwF",
      metadataProvider: TsMorphMetadataProvider,
      port: 35166,
      type: "mysql",
    });
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

}

import {User} from "../bdd/entities";
import {EntityManager, MySqlDriver, SqlEntityManager} from "@mikro-orm/mysql";
import {MikroORM} from "@mikro-orm/core";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";

export class BddService {
  private static em: EntityManager|null = null;
  private static orm: MikroORM<MySqlDriver>;
  static get entityManager():EntityManager {
    if (this.em == null) {
      this.createOrm();
    }
    return <SqlEntityManager> this.em;
  }

  private static createOrm() {
    MikroORM.init<MySqlDriver>({
      entities: [User],
      dbName: "test",
      host: "nn26812-001.dbaas.ovh.net",
      user: "secrethouse",
      password: "03c4s4wC3jqLaCgYIARAAGAMSNwF",
      metadataProvider: TsMorphMetadataProvider,
      port: 35166,
      type: "mysql",
    }).then((r)=> {
      this.orm = r;
      this.em = this.orm.em;
      console.log(this.em);
    });
  }
}

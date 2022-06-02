import type {EntityManager, MySqlDriver} from "@mikro-orm/mysql";
import {MikroORM} from "@mikro-orm/core";
import {User} from "./entities";
import {UserHandler} from "./entityHandlers"; // or any other SQL driver package

const orm = await MikroORM.init<MySqlDriver>({
  entities: [User], // path to your JS entities (dist), relative to `baseDir`
  dbName: "test",
  host: "nn26812-001.dbaas.ovh.net",
  user: "secrethouse",
  password: "03c4s4wC3jqLaCgYIARAAGAMSNwF",
  port: 35166,
  type: "mysql",
});

console.log(orm.em); // access EntityManager via `em` property
export const entityManager = orm.em as EntityManager;
export const userHandler = new UserHandler(entityManager);

import {User, Game, Room} from "./bdd/entities";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {Options} from "@mikro-orm/core";

const options = function(): Options {
  return {
    entities: [Game, Room, User],
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    metadataProvider: TsMorphMetadataProvider,
    port: Number(process.env.DB_PORT),
    type: "mysql",
  };
};

export default options;

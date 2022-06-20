import {Buzz, Event, Game, Nomination, Player, Room, RoomGame, User, Vote} from "./bdd/entities";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {Options} from "@mikro-orm/core";

const options = function(): Options {
  return {
    entities: [User, Game, Room, RoomGame, Player, Event, Buzz, Nomination, Vote],
    dbName: process.env.db_name,
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    metadataProvider: TsMorphMetadataProvider,
    port: Number(process.env.db_port),
    type: "mysql",
  };
};

export default options;

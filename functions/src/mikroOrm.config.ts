import {Buzz, Event, Game, Nomination, Player, Room, RoomGame, User, Vote} from "./bdd/entities";
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {Options} from "@mikro-orm/core";
import * as functions from "firebase-functions";

const options = function(): Options {
  return {
    entities: [User, Game, Room, RoomGame, Player, Event, Buzz, Nomination, Vote],
    dbName: functions.config().envs.db_name,
    host: functions.config().envs.db_host,
    user: functions.config().envs.db_user,
    password: functions.config().envs.db_password,
    metadataProvider: TsMorphMetadataProvider,
    port: Number(functions.config().envs.db_port),
    type: "mysql",
  };
};

export default options;

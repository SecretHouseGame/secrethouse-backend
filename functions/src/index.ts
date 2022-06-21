// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
require("express-async-errors");
import * as express from "express";
import {RequestContext} from "@mikro-orm/core";
import controllers from "./controllers";
import {BddService} from "./services/BddService";
import {ServerSideError} from "./errors";
import {config} from "dotenv";

config();

const app = express();
app.use(express.json());
app.use(async (req, res, next) =>{
  try {
    await BddService.createOrm();
  } catch (e) {
    console.log(e);
    throw new ServerSideError(e.message);
  }
  RequestContext.create(BddService.entityManager, next);
});
app.use(controllers);
app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`);
});
/* const cors = require('cors')({origin: true});
app.use(cors);*/

import * as functions from "firebase-functions";
export const api = functions
    .https
    .onRequest(app);

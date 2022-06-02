import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as express from "express";
import {RequestContext} from "@mikro-orm/core";
import controllers from "./controllers";
import {BddService} from "./services/BddService";
import {ServerSideError} from "./errors";


const app = express();
app.use(express.json());
app.use(async (req, res, next) =>{
  try {
    await BddService.createOrm();
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  RequestContext.create(BddService.entityManager, next);
});
app.use(controllers);
/* const cors = require('cors')({origin: true});
app.use(cors);*/

export const api = functions
    .https
    .onRequest((request, response) => {
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    });

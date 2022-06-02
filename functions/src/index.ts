import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as express from "express";
import {RequestContext} from "@mikro-orm/core";
import controllers from "./controllers";
import {BddService} from "./services/BddService";


const app = express();
app.use(express.json());
app.use((req, res, next) => RequestContext.create(BddService.entityManager, next));
app.use(controllers);
/* const cors = require('cors')({origin: true});
app.use(cors);*/

export const api = functions
    .region("europe-west3")
    .https
    .onRequest((request, response) => {
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    });

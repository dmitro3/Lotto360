import { frameguard, xssFilter } from "helmet";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";
import helmet = require("helmet");
import express from "express";
import cors = require("cors");
import "express-async-errors";

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { currentUser } from "./middlewares/current-user";
import { registerLotto360Routes } from "./start/lotto360.routes";
import { registerDice360Routes } from "./start/dice360.routes";

const app = express();

app.use(json());

// Helmet Security - - - - - - - - - - - - - - - - - -
app.use(helmet());
app.use(frameguard({ action: "deny" }));
app.use(xssFilter());

// Enable CORS - - - - - - - - - - - - - - - - - - - -
app.use(cors());

// Limiting API Requests - - - - - - - - - - - - - - -
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 600, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(currentUser);

// register routes
registerLotto360Routes(app);
registerDice360Routes(app);

// error handler
app.all("*", async (req) => {
    console.info(req.protocol + "://" + req.get("host") + req.originalUrl);
    throw new NotFoundError("route not found");
});

app.use(errorHandler);

export { app as httpsServer };

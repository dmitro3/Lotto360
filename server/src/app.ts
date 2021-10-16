import { frameguard, xssFilter } from "helmet";
import cookieSession from "cookie-session";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";
import helmet = require("helmet");
import express from "express";
import cors = require("cors");
import "express-async-errors";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { createRoundRouter } from "./routes/admin/round/add.routes";
import { currentUser } from "./middlewares/current-user";
import { getCurrentRoundRouter } from "./routes/admin/round/get.current.routes";
import { updateCurrentRoundRouter } from "./routes/admin/round/update.routes";
import { drawRoundRouter } from "./routes/admin/round/draw.round.routes";
import { getAllRoundsRouter } from "./routes/admin/round/get.all.routes";
import { fetchRoundRouter } from "./routes/admin/round/fetch.round.routes";
import { getRoundByIdForUserRouter } from "./routes/users/round/get.by.id.routes";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }));
app.use(currentUser);

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

// register routes
app.use(createRoundRouter);
app.use(drawRoundRouter);
app.use(getCurrentRoundRouter);
app.use(getAllRoundsRouter);
app.use(fetchRoundRouter);
app.use(getRoundByIdForUserRouter);
app.use(updateCurrentRoundRouter);

// error handler
app.all("*", async () => {
    throw new NotFoundError("route not found");
});

app.use(errorHandler);

export { app };

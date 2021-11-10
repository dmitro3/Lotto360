import { frameguard, xssFilter } from "helmet";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";
import helmet = require("helmet");
import express from "express";
import cors = require("cors");
import "express-async-errors";

import { setMaxTicketsPerBuyRouter } from "./routes/admin/helpers/set.max.tickets.per.buy";
import { getRoundByIdAdminFromDbRouter } from "./routes/admin/round/get.round.by.id.db";
import { getRemainingBnbRouter } from "./routes/admin/helpers/calculate.remain.bnb";
import { getBalanceStatsRouter } from "./routes/admin/helpers/get.balance.stats";
import { getRoundByIdAdminRouter } from "./routes/admin/round/get.round.by.id";
import { checkUserHistoryRouter } from "./routes/users/round/get.user.history";
import { transferOwnerRouter } from "./routes/admin/helpers/transfer.owner";
import { getAllTicketsRouter } from "./routes/admin/ticket/get.all.tickets";
import { getRoundByIdForUserRouter } from "./routes/users/round/get.by.id";
import { getCurrentRoundRouter } from "./routes/admin/round/get.current";
import { getSettingsRouter } from "./routes/admin/helpers/get.settings";
import { updateCurrentRoundRouter } from "./routes/admin/round/update";
import { checkForWinRouter } from "./routes/users/round/check.for.win";
import { fetchRoundRouter } from "./routes/admin/round/fetch.round";
import { createRoundRouter } from "./routes/admin/round/add.round";
import { drawRoundRouter } from "./routes/admin/round/draw.round";
import { getAllRoundsRouter } from "./routes/admin/round/get.all";
import { withdrawRouter } from "./routes/admin/helpers/withdraw";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { currentUser } from "./middlewares/current-user";
import { signinRouter } from "./routes/admin/auth/signin";
import { signoutRouter } from "./routes/admin/auth/signout";
import { currentUserRouter } from "./routes/admin/auth/current.user";
import { getWithdrawsRouter } from "./routes/admin/helpers/get.withdraws";

const app = express();

app.use(json());
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
app.use(getRoundByIdAdminFromDbRouter);
app.use(getRoundByIdForUserRouter);
app.use(setMaxTicketsPerBuyRouter);
app.use(updateCurrentRoundRouter);
app.use(getRoundByIdAdminRouter);
app.use(checkUserHistoryRouter);
app.use(getCurrentRoundRouter);
app.use(getRemainingBnbRouter);
app.use(getBalanceStatsRouter);
app.use(transferOwnerRouter);
app.use(getAllTicketsRouter);
app.use(getAllRoundsRouter);
app.use(getWithdrawsRouter);
app.use(getSettingsRouter);
app.use(createRoundRouter);
app.use(checkForWinRouter);
app.use(currentUserRouter);
app.use(fetchRoundRouter);
app.use(drawRoundRouter);
app.use(withdrawRouter);
app.use(signoutRouter);
app.use(signinRouter);

// error handler
app.all("*", async () => {
    throw new NotFoundError("route not found");
});

app.use(errorHandler);

export { app };

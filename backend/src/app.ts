import cookieSession from "cookie-session";
import { json } from "body-parser";
import express from "express";
import "express-async-errors";

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }));

// register routes

// error handler
app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

import { Express } from "express";
import { rollDiceRouter } from "../routes/dice360/roll.dice";

export const registerDice360Routes = (app: Express) => {
    app.use(rollDiceRouter);
};

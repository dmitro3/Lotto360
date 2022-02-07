import { Express } from "express";
import { rollDiceRouter } from "../routes/dice360/roll.dice";
import { spinSlotFruitlandRouter } from "../routes/fruitland/spin.slot";
import { spinSlotRouter } from "../routes/numberofthebeast/spin.slot";

export const registerDice360Routes = (app: Express) => {
    app.use(rollDiceRouter);
    app.use(spinSlotRouter);
    app.use(spinSlotFruitlandRouter);
};

import { model, Schema } from "mongoose";
import { winningTicketSchema } from "../ticket/ticket";
import {
    PoolAttrs,
    PoolDoc,
    PoolModel,
    PoolName,
    PoolWinnersAttr,
    PoolWinnersDoc,
    PoolWinnersModel,
} from "./interface.enum";

const poolSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            enum: Object.values(PoolName),
        },
        percentage: {
            type: Number,
            required: true,
        },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

poolSchema.statics.build = (attrs: PoolAttrs) => new Pool(attrs);
const Pool = model<PoolDoc, PoolModel>("Pool", poolSchema);

//
const poolWinnersSchema = new Schema(
    {
        match1: { type: [winningTicketSchema] },
        match2: { type: [winningTicketSchema] },
        match3: { type: [winningTicketSchema] },
        match4: { type: [winningTicketSchema] },
        match5: { type: [winningTicketSchema] },
        match6: { type: [winningTicketSchema] },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                // ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

poolWinnersSchema.statics.build = (attrs: PoolWinnersAttr) => new PoolWinners(attrs);
const PoolWinners = model<PoolWinnersDoc, PoolWinnersModel>(
    "PoolWinners",
    poolWinnersSchema
);

export { Pool, poolSchema, PoolWinners, poolWinnersSchema };

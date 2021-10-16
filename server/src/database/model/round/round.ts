import { model, Schema } from "mongoose";
import { RoundAttrs, RoundDoc, RoundModel, RoundStatus } from "./interface.enum";
import { poolSchema, poolWinnersSchema } from "../pool/pool";
import { ticketSchema } from "../ticket/ticket";

const roundSchema = new Schema(
    {
        cid: {
            type: Number,
            required: true,
            unique: true,
            index: true,
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(RoundStatus),
            default: RoundStatus.Open,
        },
        startTime: {
            type: Number,
            required: true,
        },
        endTime: {
            type: Number,
            required: true,
        },
        ticketPrice: {
            type: Number,
            required: true,
        },
        firstTicketId: {
            type: Number,
            required: true,
        },
        firstTicketIdNextRound: {
            type: Number,
            required: true,
        },
        totalBnbAmount: {
            type: Number,
            required: true,
        },
        bonusBnbAmount: {
            type: Number,
            required: true,
        },
        bnbAddedFromLastRound: {
            type: Number,
            required: true,
        },
        finalNumber: {
            type: Number,
            required: true,
        },
        totalPlayers: {
            type: Number,
            required: true,
        },
        totalTickets: {
            type: Number,
            required: true,
        },
        tickets: {
            type: [ticketSchema],
        },
        pools: {
            type: [poolSchema],
        },
        winnersInPools: {
            type: poolWinnersSchema,
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

roundSchema.statics.build = (attrs: RoundAttrs) => new Round(attrs);
const Round = model<RoundDoc, RoundModel>("Round", roundSchema);

export { Round };

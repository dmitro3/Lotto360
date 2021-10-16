import { model, Schema } from "mongoose";
import {
    TicketAttrs,
    TicketDoc,
    TicketModel,
    TicketStatus,
    WinningTicketAttrs,
    WinningTicketDoc,
    WinningTicketModel,
} from "./interface.enum";

const winningTicketSchema = new Schema(
    {
        cid: {
            type: Number,
            required: true,
            // unique: true,
            // index: true,
        },
        owner: {
            type: String,
            required: true,
            index: true,
        },
        number: {
            type: Number,
            required: true,
        },
        ticketStatus: {
            type: String,
            required: true,
            enum: Object.values(TicketStatus),
            default: TicketStatus.Unknown,
        },
        prizeClaimed: {
            type: Boolean,
            required: true,
            default: false,
        },
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

winningTicketSchema.statics.build = (attrs: WinningTicketAttrs) =>
    new WinningTicket(attrs);
const WinningTicket = model<WinningTicketDoc, WinningTicketModel>(
    "WinningTicket",
    winningTicketSchema
);

// ...........................................................................................
const ticketSchema = new Schema(
    {
        cid: {
            type: Number,
            required: true,
            unique: true,
            index: true,
        },
        owner: {
            type: String,
            required: true,
            index: true,
        },
        number: {
            type: Number,
            required: true,
        },
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

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs);
const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket, ticketSchema, WinningTicket, winningTicketSchema };

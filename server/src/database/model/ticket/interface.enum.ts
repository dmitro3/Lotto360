import { Document, Model } from "mongoose";

enum TicketStatus {
    Unknown,
    Win,
    Lose,
}

interface TicketAttrs {
    cid: number;
    owner: string;
    number: number;
    ticketStatus: TicketStatus;
    prizeClaimed: boolean;
}

interface TicketDoc extends Document {
    cid: number;
    owner: string;
    number: number;
    ticketStatus: TicketStatus;
    prizeClaimed: boolean;
}

interface TicketModel extends Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

export { TicketAttrs, TicketDoc, TicketModel, TicketStatus };

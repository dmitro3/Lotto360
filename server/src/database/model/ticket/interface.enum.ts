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
    isClaimed: boolean;
}

interface WinningTicketAttrs extends TicketAttrs {
    ticketStatus: TicketStatus;
}
interface WinningTicketDoc extends TicketDoc {
    ticketStatus: TicketStatus;
}

interface TicketDoc extends Document {
    cid: number;
    owner: string;
    number: number;
    isClaimed: boolean;
}

interface TicketModel extends Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

interface WinningTicketModel extends Model<WinningTicketDoc> {
    build(attrs: WinningTicketAttrs): WinningTicketDoc;
}

export {
    TicketAttrs,
    TicketDoc,
    TicketModel,
    TicketStatus,
    WinningTicketAttrs,
    WinningTicketModel,
    WinningTicketDoc,
};

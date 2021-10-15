import { Document, Model } from "mongoose";
import { PoolAttrs, PoolWinnersAttr } from "../pool/interface.enum";
import { TicketAttrs } from "../ticket/interface.enum";

enum RoundStatus {
    Pending,
    Open,
    Close,
    Claimable,
}

interface RoundAttrs {
    cid: number;
    status: RoundStatus;
    startTime: number;
    endTime: number;
    ticketPrice: number;
    firstTicketId: number;
    firstTicketIdNextRound: number;
    totalBnbAmount: number;
    bonusBnbAmount: number;
    bnbAddedFromLastRound: number;
    finalNumber: number;
    totalPlayers: number;
    totalTickets: number;
    isInDb?: boolean;
    tickets?: TicketAttrs[];
    pools?: PoolAttrs[];
    winnersInPools?: PoolWinnersAttr;
}

interface RoundDoc extends Document {
    cid: number;
    status: RoundStatus;
    startTime: number;
    endTime: number;
    ticketPrice: number;
    firstTicketId: number;
    firstTicketIdNextRound: number;
    totalBnbAmount: number;
    bonusBnbAmount: number;
    bnbAddedFromLastRound: number;
    finalNumber: number;
    totalPlayers: number;
    tickets: TicketAttrs;
    pools: PoolAttrs;
    winnersInPools: PoolWinnersAttr;
}

interface RoundModel extends Model<RoundDoc> {
    build(attrs: RoundAttrs): RoundDoc;
}

export { RoundAttrs, RoundDoc, RoundModel, RoundStatus };

import moment from "moment";
import {
    defaultPools,
    GetRoundApiModel,
    RoundStatus,
} from "../../../../api/models/round.model";

export let initialRound: GetRoundApiModel = {
    cid: 0,
    bnbAddedFromLastRound: 0,
    bonusBnbAmount: 0,
    endTime: moment().unix(),
    finalNumber: 0,
    firstTicketId: 0,
    firstTicketIdNextRound: 0,
    startTime: 0,
    status: RoundStatus.Open,
    ticketPrice: 0.02,
    totalBnbAmount: 0,
    pools: defaultPools,
    totalPlayers: 0,
    totalTickets: 0,
};

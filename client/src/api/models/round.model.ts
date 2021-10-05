export interface GetRoundListViewModel {
    rounds: GetRoundApiModel[];
}

export enum RoundStatus {
    Pending,
    Open,
    Close,
    Claimable,
}
export enum TicketStatus {
    Unknown,
    Win,
    Lose,
}
export enum PoolName {
    Match1,
    Match2,
    Match3,
    Match4,
    Match5,
    Match6,
    Treasury,
}

export interface PoolAttrs {
    name: PoolName;
    percentage: number;
}

export interface TicketAttrs {
    cid: number;
    owner: string;
    number: number;
    ticketStatus: TicketStatus;
    prizeClaimed: boolean;
}

export interface GetRoundApiModel {
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
    tickets: TicketAttrs;
    pools: PoolAttrs;
}

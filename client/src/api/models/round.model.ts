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

export const defaultPools: PoolAttrs[] = [
    { name: PoolName.Match1, percentage: 2 },
    { name: PoolName.Match2, percentage: 3 },
    { name: PoolName.Match3, percentage: 5 },
    { name: PoolName.Match4, percentage: 10 },
    { name: PoolName.Match5, percentage: 20 },
    { name: PoolName.Match6, percentage: 50 },
    { name: PoolName.Treasury, percentage: 10 },
];

export interface PoolAttrs {
    name: PoolName;
    percentage: number;
}

export interface TicketAttrs {
    cid: number;
    owner: string;
    number: number;
    isClaimed: boolean;
}

export interface WinningTicketAttrs extends TicketAttrs {
    ticketStatus: TicketStatus;
}

export interface PoolWinnersAttr {
    match1: WinningTicketAttrs[];
    match2: WinningTicketAttrs[];
    match3: WinningTicketAttrs[];
    match4: WinningTicketAttrs[];
    match5: WinningTicketAttrs[];
    match6: WinningTicketAttrs[];
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
    totalPlayers: number;
    totalTickets: number;
    isInDb?: boolean;
    tickets?: TicketAttrs[];
    pools?: PoolAttrs[];
    winnersInPools?: PoolWinnersAttr;
}

export interface RoundWinBrief {
    roundId: number;
    winningNumber: number;
    m1?: {
        price: number;
        tickets: number[];
    };
    m2?: {
        price: number;
        tickets: number[];
    };
    m3?: {
        price: number;
        tickets: number[];
    };
    m4?: {
        price: number;
        tickets: number[];
    };
    m5?: {
        price: number;
        tickets: number[];
    };
    m6?: {
        price: number;
        tickets: number[];
    };
}

export interface CheckForWin {
    totalWin: number;
    briefs: RoundWinBrief[];
}

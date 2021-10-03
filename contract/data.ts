enum WinningStatus {
    WINNER,
    NOT_WIN,
    NOT_CHECKED,
}

enum RoundStatus {
    Pending,
    Open,
    Close,
    Claimable,
}

interface Ticket {
    owner: string;
    number: string;
    winStatus: WinningStatus;
    prizeClaimed?: boolean;
}

interface Round {
    status: RoundStatus;
    startTime: number;
    endTime: number;
    ticketPrice: number;
    firstTicketId: number;
    firstTicketIdNextRound: number;
    totalBnbAmount: number;
    bonusBnbAmount: number;
    bnbAddedFromLastRound: number;
    finalNumber: string;
}

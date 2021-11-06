export interface DashboardModel {
    contractBalance: number;
    currentRoundBalance: number;
    treasuryBalance: number;
    winnersBalance: number;
    totalWithdraws: number;
}

export interface TransferTokenModel {
    recipient: string;
    amount: string;
    passphrase: string;
}

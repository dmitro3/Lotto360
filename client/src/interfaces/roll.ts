export interface Roll {
    amount: string;
    ctFee: string;
    guess: string;
    id: string;
    multiplier: string;
    purchaseTime: string;
    result: string;
    rollTime: string;
    status: RollStatus;
    user: string;
}

export enum RollStatus {
    Ready = "0",
    Expired = "1",
}

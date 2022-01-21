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

export const convertRoll = (chainRolls: any[]) => {
    const rolls: Roll[] = [];
    chainRolls.forEach((r) => {
        rolls.push({
            amount: r.amount,
            ctFee: r.ctFee,
            guess: r.guess,
            id: r.id,
            multiplier: r.multiplier,
            purchaseTime: r.purchaseTime,
            result: r.result,
            rollTime: r.rollTime,
            status: r.status,
            user: r.user,
        });
    });
    return rolls;
};

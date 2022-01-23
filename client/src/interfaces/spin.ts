export interface Spin {
    amount: string;
    ctFee: string;
    guess: string;
    id: string;
    multiplier: string;
    purchaseTime: string;
    result: string;
    spinTime: string;
    status: SpinStatus;
    user: string;
}

export enum SpinStatus {
    Ready = "0",
    Expired = "1",
}

export const convertSpin = (chainSpins: any[]) => {
    const spins: Spin[] = [];
    chainSpins.forEach((r) => {
        spins.push({
            amount: r.amount,
            ctFee: r.ctFee,
            guess: r.guess,
            id: r.id,
            multiplier: r.multiplier,
            purchaseTime: r.purchaseTime,
            result: r.result,
            spinTime: r.spinTime,
            status: r.status,
            user: r.user,
        });
    });
    return spins;
};

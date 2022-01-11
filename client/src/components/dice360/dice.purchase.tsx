import { Dispatch, FunctionComponent } from "react";

interface DicePurchaseProps {
    alreadyPurchased: boolean;
    balance: number;
    betAmount: number;
    btnSmallInfo: JSX.Element;
    maxBet: number;
    minBet: number;
    multiplier: number;
    purchaseRoll: () => void;
    setBetAmount: Dispatch<React.SetStateAction<number>>;
}

const DicePurchase: FunctionComponent<DicePurchaseProps> = ({
    alreadyPurchased,
    balance,
    betAmount,
    btnSmallInfo,
    maxBet,
    minBet,
    multiplier,
    purchaseRoll,
    setBetAmount,
}) => {
    return (
        <div
            className={`purchase-box rounded bg-white shadow p-4 ${
                alreadyPurchased ? "opacity-50" : ""
            }`}
        >
            <h4 className="fw-bold mb-4">
                <i className="fa-regular fa-circle-1 me-2"></i>
                Purchase roll
            </h4>
            <div className="d-flex justify-content-between mb-3">
                <span>Your balance</span>
                <span className="fw-bold">{balance} BNB</span>
            </div>
            <div className="input-group mb-3">
                <input
                    className="form-control"
                    disabled={alreadyPurchased}
                    type="number"
                    placeholder="enter bet amount"
                    value={betAmount}
                    onChange={(e) => {
                        if (!e.target.value) setBetAmount(0);
                        else {
                            const val = parseFloat(e.target.value);
                            setBetAmount(val);
                        }
                    }}
                />
            </div>
            <p className="mb-0">
                {btnSmallInfo}
                Bet range:
                <span className="fw-bold ms-2">
                    {minBet} to {maxBet} BNB
                </span>
            </p>
            <p>
                {btnSmallInfo}
                Win amount x{multiplier}:
                <span className="fw-bold ms-2">{betAmount * multiplier || 0} BNB</span>
            </p>
            <button
                type="button"
                className="btn btn-success w-100 mt-3"
                disabled={
                    !(betAmount >= minBet && betAmount <= maxBet) || alreadyPurchased
                }
                onClick={() => purchaseRoll()}
            >
                {alreadyPurchased ? "already purchased roll" : "purchase roll"}
            </button>
        </div>
    );
};

export default DicePurchase;
